const CustomError = require("../errors");
const { isTokenValid, attachCookiesToResponse } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  const refreshToken = req.signedCookies.refreshToken;
  

  if (!token && !refreshToken) {
    throw new CustomError.UnauthenticatedError("Authentication invalid1");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    if (refreshToken) {
      try {
        const { name, userId, role } = isTokenValid({ token: refreshToken });
        const user = { name, userId, role };
        attachCookiesToResponse({ res, user });
        req.user = user;
        next();
      } catch (refreshError) {
        throw new CustomError.UnauthenticatedError("Authentication invalid2");
      }
    } else {
      throw new CustomError.UnauthenticatedError("Authentication invalid3");
    }
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };