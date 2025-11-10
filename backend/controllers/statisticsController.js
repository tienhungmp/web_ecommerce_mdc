const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const { StatusCodes } = require("http-status-codes");

// Helper function để lấy ngày bắt đầu và kết thúc
const getDateRange = (timeRange, year) => {
  const currentYear = parseInt(year);
  const now = new Date();
  const isCurrentYear = currentYear === now.getFullYear();
  let startDate, endDate;

  switch (timeRange) {
    case "week":
      if (isCurrentYear) {
        // Nếu là năm hiện tại, lấy 7 ngày gần nhất
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        endDate = now;
      } else {
        // Nếu là năm trước, lấy 7 ngày cuối năm đó
        endDate = new Date(currentYear, 11, 31, 23, 59, 59);
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      }
      break;
    case "month":
      if (isCurrentYear) {
        // Nếu là năm hiện tại, lấy 30 ngày gần nhất
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        endDate = now;
      } else {
        // Nếu là năm trước, lấy 30 ngày cuối năm đó
        endDate = new Date(currentYear, 11, 31, 23, 59, 59);
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
      }
      break;
    case "year":
      // Lấy cả năm được chọn
      startDate = new Date(currentYear, 0, 1);
      endDate = isCurrentYear 
        ? now 
        : new Date(currentYear, 11, 31, 23, 59, 59);
      break;
    default:
      startDate = new Date(currentYear, 0, 1);
      endDate = isCurrentYear 
        ? now 
        : new Date(currentYear, 11, 31, 23, 59, 59);
  }

  return { startDate, endDate };
};

// 1. Thống kê tổng quan
const getOverviewStats = async (req, res) => {
  try {
    const { timeRange = "month", year = new Date().getFullYear() } = req.query;
    const { startDate, endDate } = getDateRange(timeRange, parseInt(year));

    // Lấy thống kê kỳ hiện tại
    const currentOrders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      orderStatus: { $ne: "Cancelled" },
    });

    // Lấy thống kê kỳ trước để tính % thay đổi
    const previousStartDate = new Date(startDate);
    previousStartDate.setTime(
      startDate.getTime() - (endDate.getTime() - startDate.getTime())
    );
    const previousOrders = await Order.find({
      createdAt: { $gte: previousStartDate, $lt: startDate },
      orderStatus: { $ne: "Cancelled" },
    });

    // Tính tổng doanh thu
    const totalRevenue = currentOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const previousRevenue = previousOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    const revenueChange = previousRevenue
      ? (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
      : 0;

    // Tính số đơn hàng
    const totalOrders = currentOrders.length;
    const previousTotalOrders = previousOrders.length;
    const ordersChange = previousTotalOrders
      ? (((totalOrders - previousTotalOrders) / previousTotalOrders) * 100).toFixed(1)
      : 0;

    // Tính khách hàng mới
    const newCustomers = await User.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
      role: "user",
    });
    const previousNewCustomers = await User.countDocuments({
      createdAt: { $gte: previousStartDate, $lt: startDate },
      role: "user",
    });
    const customersChange = previousNewCustomers
      ? (((newCustomers - previousNewCustomers) / previousNewCustomers) * 100).toFixed(1)
      : 0;

    // Tính tổng sản phẩm đã bán
    const totalProductsSold = currentOrders.reduce((sum, order) => {
      return (
        sum +
        order.products.reduce(
          (productSum, item) => productSum + item.quantity,
          0
        )
      );
    }, 0);
    const previousProductsSold = previousOrders.reduce((sum, order) => {
      return (
        sum +
        order.products.reduce(
          (productSum, item) => productSum + item.quantity,
          0
        )
      );
    }, 0);
    const productsSoldChange = previousProductsSold
      ? (((totalProductsSold - previousProductsSold) / previousProductsSold) * 100).toFixed(1)
      : 0;

    res.status(StatusCodes.OK).json({
      overview: [
        {
          title: "Tổng doanh thu",
          value: totalRevenue,
          change: `${revenueChange >= 0 ? "+" : ""}${revenueChange}%`,
          trend: revenueChange >= 0 ? "up" : "down",
        },
        {
          title: "Đơn hàng",
          value: totalOrders,
          change: `${ordersChange >= 0 ? "+" : ""}${ordersChange}%`,
          trend: ordersChange >= 0 ? "up" : "down",
        },
        {
          title: "Khách hàng mới",
          value: newCustomers,
          change: `${customersChange >= 0 ? "+" : ""}${customersChange}%`,
          trend: customersChange >= 0 ? "up" : "down",
        },
        {
          title: "Sản phẩm bán ra",
          value: totalProductsSold,
          change: `${productsSoldChange >= 0 ? "+" : ""}${productsSoldChange}%`,
          trend: productsSoldChange >= 0 ? "up" : "down",
        },
      ],
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching overview stats",
      error: error.message,
    });
  }
};

// 2. Doanh thu theo tháng
const getRevenueByMonth = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59);

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      orderStatus: { $ne: "Cancelled" },
    });

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: `T${i + 1}`,
      revenue: 0,
      orders: 0,
      customers: 0,
    }));

    // Tính doanh thu và đơn hàng theo tháng
    orders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      monthlyData[month].revenue += order.totalPrice;
      monthlyData[month].orders += 1;
    });

    // Tính khách hàng mới theo tháng
    const users = await User.find({
      createdAt: { $gte: startDate, $lte: endDate },
      role: "user",
    });

    users.forEach((user) => {
      const month = new Date(user.createdAt).getMonth();
      monthlyData[month].customers += 1;
    });

    res.status(StatusCodes.OK).json({ revenueData: monthlyData });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching revenue by month",
      error: error.message,
    });
  }
};

// 3. Top sản phẩm bán chạy
const getTopProducts = async (req, res) => {
  try {
    const { timeRange = "month", year = new Date().getFullYear(), limit = 5 } = req.query;
    const { startDate, endDate } = getDateRange(timeRange, parseInt(year));

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      orderStatus: { $ne: "Cancelled" },
    }).populate("products.product");

    // Tính toán sản phẩm bán chạy
    const productStats = {};

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.product) {
          const productId = item.product._id.toString();
          if (!productStats[productId]) {
            productStats[productId] = {
              name: item.product.name,
              sold: 0,
              revenue: 0,
            };
          }
          productStats[productId].sold += item.quantity;
          productStats[productId].revenue += item.price * item.quantity;
        }
      });
    });

    // Chuyển đổi và sắp xếp
    const topProducts = Object.values(productStats)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, parseInt(limit));

    res.status(StatusCodes.OK).json({ topProducts });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching top products",
      error: error.message,
    });
  }
};

// 4. Doanh thu theo danh mục
const getRevenueByCategory = async (req, res) => {
  try {
    const { timeRange = "month", year = new Date().getFullYear() } = req.query;
    const { startDate, endDate } = getDateRange(timeRange, parseInt(year));

    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      orderStatus: { $ne: "Cancelled" },
    }).populate({
      path: "products.product",
      populate: { path: "mainCategory" },
    });

    const categoryStats = {};
    let totalRevenue = 0;

    orders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.product && item.product.mainCategory) {
          const categoryName = item.product.mainCategory.name;
          const revenue = item.price * item.quantity;
          
          if (!categoryStats[categoryName]) {
            categoryStats[categoryName] = {
              name: categoryName,
              revenue: 0,
              value: 0,
            };
          }
          categoryStats[categoryName].revenue += revenue;
          totalRevenue += revenue;
        }
      });
    });

    // Tính phần trăm
    const categoryData = Object.values(categoryStats).map((cat) => ({
      ...cat,
      value: totalRevenue > 0 ? Math.round((cat.revenue / totalRevenue) * 100) : 0,
    }));

    res.status(StatusCodes.OK).json({ categoryData });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching revenue by category",
      error: error.message,
    });
  }
};

// 5. Trạng thái đơn hàng
const getOrderStatusStats = async (req, res) => {
  try {
    const { timeRange = "month", year = new Date().getFullYear() } = req.query;
    const { startDate, endDate } = getDateRange(timeRange, parseInt(year));

    const orderStatuses = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusMap = {
      Delivered: { name: "Đã giao", color: "#10b981" },
      Shipped: { name: "Đang giao", color: "#3b82f6" },
      Processing: { name: "Chờ xử lý", color: "#f59e0b" },
      Pending: { name: "Chờ xử lý", color: "#f59e0b" },
      Cancelled: { name: "Đã hủy", color: "#ef4444" },
    };

    const orderStatusData = orderStatuses.map((status) => ({
      name: statusMap[status._id]?.name || status._id,
      value: status.count,
      color: statusMap[status._id]?.color || "#6b7280",
    }));

    res.status(StatusCodes.OK).json({ orderStatusData });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching order status stats",
      error: error.message,
    });
  }
};

// 6. API tổng hợp tất cả thống kê
const getAllStatistics = async (req, res) => {
  try {
    const { timeRange = "month", year = new Date().getFullYear() } = req.query;

    // Gọi tất cả các hàm thống kê
    const { startDate, endDate } = getDateRange(timeRange, parseInt(year));

    // Overview stats
    const currentOrders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate },
      orderStatus: { $ne: "Cancelled" },
    }).populate({
      path: "products.product",
      populate: { path: "mainCategory" },
    });

    const previousStartDate = new Date(startDate);
    previousStartDate.setTime(
      startDate.getTime() - (endDate.getTime() - startDate.getTime())
    );
    const previousOrders = await Order.find({
      createdAt: { $gte: previousStartDate, $lt: startDate },
      orderStatus: { $ne: "Cancelled" },
    });

    // Calculations
    const totalRevenue = currentOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const revenueChange = previousRevenue
      ? (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
      : 0;

    const totalOrders = currentOrders.length;
    const previousTotalOrders = previousOrders.length;
    const ordersChange = previousTotalOrders
      ? (((totalOrders - previousTotalOrders) / previousTotalOrders) * 100).toFixed(1)
      : 0;

    const newCustomers = await User.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
      role: "user",
    });
    const previousNewCustomers = await User.countDocuments({
      createdAt: { $gte: previousStartDate, $lt: startDate },
      role: "user",
    });
    const customersChange = previousNewCustomers
      ? (((newCustomers - previousNewCustomers) / previousNewCustomers) * 100).toFixed(1)
      : 0;

    const totalProductsSold = currentOrders.reduce((sum, order) => {
      return sum + order.products.reduce((productSum, item) => productSum + item.quantity, 0);
    }, 0);
    const previousProductsSold = previousOrders.reduce((sum, order) => {
      return sum + order.products.reduce((productSum, item) => productSum + item.quantity, 0);
    }, 0);
    const productsSoldChange = previousProductsSold
      ? (((totalProductsSold - previousProductsSold) / previousProductsSold) * 100).toFixed(1)
      : 0;

    // Monthly revenue data
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year, 11, 31, 23, 59, 59);
    const yearOrders = await Order.find({
      createdAt: { $gte: yearStart, $lte: yearEnd },
      orderStatus: { $ne: "Cancelled" },
    });

    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: `T${i + 1}`,
      revenue: 0,
      orders: 0,
      customers: 0,
    }));

    yearOrders.forEach((order) => {
      const month = new Date(order.createdAt).getMonth();
      monthlyData[month].revenue += order.totalPrice;
      monthlyData[month].orders += 1;
    });

    const users = await User.find({
      createdAt: { $gte: yearStart, $lte: yearEnd },
      role: "user",
    });

    users.forEach((user) => {
      const month = new Date(user.createdAt).getMonth();
      monthlyData[month].customers += 1;
    });

    // Top products
    const productStats = {};
    currentOrders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.product) {
          const productId = item.product._id.toString();
          if (!productStats[productId]) {
            productStats[productId] = {
              name: item.product.name,
              sold: 0,
              revenue: 0,
            };
          }
          productStats[productId].sold += item.quantity;
          productStats[productId].revenue += item.price * item.quantity;
        }
      });
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    // Category revenue
    const categoryStats = {};
    let categoryTotalRevenue = 0;

    currentOrders.forEach((order) => {
      order.products.forEach((item) => {
        if (item.product && item.product.mainCategory) {
          const categoryName = item.product.mainCategory.name;
          const revenue = item.price * item.quantity;
          
          if (!categoryStats[categoryName]) {
            categoryStats[categoryName] = {
              name: categoryName,
              revenue: 0,
            };
          }
          categoryStats[categoryName].revenue += revenue;
          categoryTotalRevenue += revenue;
        }
      });
    });

    const categoryData = Object.values(categoryStats).map((cat) => ({
      ...cat,
      value: categoryTotalRevenue > 0 
        ? Math.round((cat.revenue / categoryTotalRevenue) * 100) 
        : 0,
    }));

    // Order status
    const orderStatuses = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusMap = {
      Delivered: { name: "Đã giao", color: "#10b981" },
      Shipped: { name: "Đang giao", color: "#3b82f6" },
      Processing: { name: "Chờ xử lý", color: "#f59e0b" },
      Pending: { name: "Chờ xử lý", color: "#f59e0b" },
      Cancelled: { name: "Đã hủy", color: "#ef4444" },
    };

    const orderStatusData = orderStatuses.map((status) => ({
      name: statusMap[status._id]?.name || status._id,
      value: status.count,
      color: statusMap[status._id]?.color || "#6b7280",
    }));

    res.status(StatusCodes.OK).json({
      overview: [
        {
          title: "Tổng doanh thu",
          value: totalRevenue,
          change: `${revenueChange >= 0 ? "+" : ""}${revenueChange}%`,
          trend: revenueChange >= 0 ? "up" : "down",
        },
        {
          title: "Đơn hàng",
          value: totalOrders,
          change: `${ordersChange >= 0 ? "+" : ""}${ordersChange}%`,
          trend: ordersChange >= 0 ? "up" : "down",
        },
        {
          title: "Khách hàng mới",
          value: newCustomers,
          change: `${customersChange >= 0 ? "+" : ""}${customersChange}%`,
          trend: customersChange >= 0 ? "up" : "down",
        },
        {
          title: "Sản phẩm bán ra",
          value: totalProductsSold,
          change: `${productsSoldChange >= 0 ? "+" : ""}${productsSoldChange}%`,
          trend: productsSoldChange >= 0 ? "up" : "down",
        },
      ],
      revenueData: monthlyData,
      topProducts,
      categoryData,
      orderStatusData,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getOverviewStats,
  getRevenueByMonth,
  getTopProducts,
  getRevenueByCategory,
  getOrderStatusStats,
  getAllStatistics,
};