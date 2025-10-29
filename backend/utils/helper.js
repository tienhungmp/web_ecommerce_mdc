const validator = require("validator");
const bcrypt = require("bcryptjs");

const isPasswordStrong = (password) => {
  const isValidLength = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    isValidLength && hasUpperCase && hasLowerCase && hasNumber
  );
};

module.exports = {
  isPasswordStrong,
};
