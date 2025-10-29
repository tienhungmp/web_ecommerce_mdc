const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { createTokenUser, attachCookiesToResponse, createJWT } = require("../utils");
const {isPasswordStrong} = require("../utils/helper")
const { sendEmail } = require("../utils/email");
const crypto = require("crypto");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    throw new CustomError.BadRequestError("Email already exists");
  }
  if (!isPasswordStrong(password)) {
    throw new CustomError.BadRequestError(
      "Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character"
    );
  }

  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
  const user = await User.create({ name, email, password, role });

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);
  const {accessToken,refreshToken} = attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser, msg: "Login successful!",accessToken: accessToken, refreshToken:refreshToken});
};

const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: false,     // giữ giống lúc set
    signed: true,
    secure: true,        // giống lúc set
    sameSite: "None",    // giống lúc set
    path: "/",           // thêm path cho chắc chắn
    expires: new Date(0) // thời điểm đã hết hạn
  };

  res.cookie("token", "", cookieOptions);
  res.cookie("refreshToken", "", cookieOptions);

  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};
const refreshToken = async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;

  if (!refreshToken) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }

  try {
    const payload = isTokenValid({ token: refreshToken });
    const user = { name: payload.name, userId: payload.userId, role: payload.role };
    attachCookiesToResponse({ res, user });
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.BadRequestError("No user found with this email");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = Date.now() + 3600000;
  await user.save();

  // const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`;
  const resetURL = `${resetToken}`;

  const message = `Your password reset code: \n\n ${process.env.URL_FE}/forgot-password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
    });

    res.status(StatusCodes.OK).json({ msg: "Password reset link sent to your email" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    throw new CustomError.InternalServerError("Email could not be sent");
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError.BadRequestError("Invalid or expired token");
  }

  if (!isPasswordStrong(password)) {
    throw new CustomError.BadRequestError(
      "Password must be at least 6 characters long, contain uppercase, lowercase, number"
    );
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password reset successful" });
};


module.exports = { register, login, logout, refreshToken,forgotPassword,resetPassword };
