const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {isPasswordStrong} = require("../utils/helper")
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermissions,
} = require("../utils");

//** ======================== Get all users ========================
const getAllUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;

    // Kiểm tra xem có truyền `page` và `limit` hay không
    if (page && limit) {
      const pageNumber = parseInt(page, 10) || 1; // Mặc định page là 1 nếu không phải số
      const limitNumber = parseInt(limit, 10) || 10; // Mặc định limit là 10 nếu không phải số
      const skip = (pageNumber - 1) * limitNumber;

      // Tìm user theo page và limit
      const user = await User.find({ role: "user" })
        .select("-password")
        .skip(skip)
        .limit(limitNumber);

      const totalUsers = await User.countDocuments({ role: "user" });

      return res.status(StatusCodes.OK).json({
        total_users: totalUsers,
        page: pageNumber,
        limit: limitNumber,
        total_pages: Math.ceil(totalUsers / limitNumber),
        user,
      });
    }

    // Lấy tất cả user nếu không có `page` và `limit`
    const user = await User.find({ role: "user" }).select("-password");
    return res.status(StatusCodes.OK).json({ total_users: user.length, user });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Có lỗi xảy ra khi lấy danh sách người dùng",
    });
  }
};

//** ======================== Get single user ========================
const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw CustomError.NotFoundError("User does not exist");
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

//** ======================== Show current user ========================
const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

//** ======================== Update user ========================
const updateUser = async (req, res) => {
    const { name, email, address, phone } = req.body;

    if (!name || !email || !phone) {
      throw new CustomError.BadRequestError("Please provide name and email and phone");
    }

    const user = await User.findOne({ _id: req.user.userId });

    user.name = name;
    user.email = email;
    user.phone = phone;

    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }

    await user.save();

    const tokenUser = createTokenUser(user);

    attachCookiesToResponse({ res, user: tokenUser });

    res.status(StatusCodes.OK).json({ user: tokenUser });
};

//** ======================== Update user password ========================
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError("Please provide both values");
  }

  if (!isPasswordStrong(newPassword)) {
    throw new CustomError.BadRequestError(
      "Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character"
    );
  }

  const user = await User.findOne({ _id: req.user.userId });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Wrong password provided");
  }
  user.password = newPassword;
  await user.save();

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ msg: "Success! Password Updated" });
};

const deleteUser = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.NotFoundError("User does not exist");
  }

  checkPermissions(req.user, user._id);

  await user.remove();

  res
    .status(StatusCodes.OK)
    .json({ msg: `User with ID: ${userId} has been deleted` });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
};
