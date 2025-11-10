const express = require("express");
const router = express.Router();

const {
  getOverviewStats,
  getRevenueByMonth,
  getTopProducts,
  getRevenueByCategory,
  getOrderStatusStats,
  getAllStatistics,
} = require("../controllers/statisticsController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

// Tất cả routes đều yêu cầu quyền admin
router.use(authenticateUser);
router.use(authorizePermissions("admin"));

// Route lấy tất cả thống kê cùng lúc (recommended)
router.get("/all", getAllStatistics);

// Routes riêng lẻ (nếu cần)
router.get("/overview", getOverviewStats);
router.get("/revenue-by-month", getRevenueByMonth);
router.get("/top-products", getTopProducts);
router.get("/revenue-by-category", getRevenueByCategory);
router.get("/order-status", getOrderStatusStats);

module.exports = router;