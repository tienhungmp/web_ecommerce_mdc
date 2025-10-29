const jwt = require("jsonwebtoken");

const createJWT = ({ payload, expiresIn }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, accessToken, refreshToken }) => {
  const accessTokenTTL = process.env.JWT_ACCESS_LIFETIME || "15m";
  const refreshTokenTTL = process.env.JWT_REFRESH_LIFETIME || "7d";

  const newAccessToken = accessToken || createJWT({ payload: user, expiresIn: accessTokenTTL });
  const newRefreshToken = refreshToken || createJWT({ payload: user, expiresIn: refreshTokenTTL });

  const oneDay = 1000 * 60 * 60 * 24;
  const secure = process.env.NODE_ENV === "production";
  const cookieOptions = {
    httpOnly: false,  // nếu vẫn muốn client đọc được
    signed: true,
    secure: true,     // bắt buộc true khi dùng https
    sameSite: 'None', // để browser chấp nhận cookie cross-site
  };
    
  res.cookie('token', newAccessToken, {
    ...cookieOptions,
    maxAge: 1000 * 60 * 15, // 15 phút
  });
  
  res.cookie('refreshToken', newRefreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};


module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};