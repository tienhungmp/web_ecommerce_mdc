const express = require("express")
const router = express.Router()

const { register, login, logout, refreshToken,forgotPassword, resetPassword } = require("../controllers/authController")


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/refreshToken").get(refreshToken)
router.route("/logout").get(logout)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)

module.exports = router
