// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();

// Các controller cho category
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Middleware để xác thực người dùng và phân quyền
const { authenticateUser, authorizePermissions } = require("../middleware/authentication");

// Định tuyến cho category
router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createCategory)  // Tạo mới category
  .get(getAllCategories);  // Lấy tất cả các category

router
  .route("/:id")
  .get(getCategory)  // Lấy category theo ID
  .patch([authenticateUser, authorizePermissions("admin")], updateCategory)  // Cập nhật category theo ID
  .delete([authenticateUser, authorizePermissions("admin")], deleteCategory);  // Xóa category theo ID

module.exports = router;