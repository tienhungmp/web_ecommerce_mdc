const Order = require("../models/orderModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Warranty = require("../models/warrantyModel");
const Product = require("../models/productModel");
const { ProductCode, VnpLocale, dateFormat, VNPay, ignoreLogger } = require('vnpay');

const createOrder = async (req, res) => {
  const { products, shippingAddress, discount, phone, email, paymentMethod } = req.body;

  if (!phone) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Phone number is required" });
  }
  if (!shippingAddress) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Shipping adress is required" });
  }

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email adress is required" });
  }

  try {
    // Giảm inventory và tăng sold cho từng sản phẩm
    for (const prod of products) {
      const { product, quantity } = prod;

      const dbProduct = await Product.findById(product);

      if (!dbProduct) {
        throw new Error(`Product with ID ${product} not found`);
      }

      if (dbProduct.inventory < quantity) {
        throw new Error(
          `Insufficient inventory for product: ${dbProduct.name}`
        );
      }

      dbProduct.inventory -= quantity;
      dbProduct.sold += quantity;
      await dbProduct.save();
    }

    // Tạo đơn hàng
    const order = await Order.create({
      user: req.user?.userId || null,
      products,
      discount,
      shippingAddress,
      phone,
      email,
      paymentMethod,
      paymentStatus: "Pending",
    });

    res.status(StatusCodes.CREATED).json({ order });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Server Error" });
  }
};

const getOrderCurrentUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ total_orders: orders.length, orders });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { phone, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;
    const ordersQuery = phone
      ? { phone: { $regex: phone, $options: "i" } }
      : {};

    const orders = await Order.find(ordersQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    const totalOrders = await Order.countDocuments(ordersQuery);

    res.status(StatusCodes.OK).json({
      total_orders: totalOrders,
      orders,
      total_pages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};


const getSingleOrder = async (req, res) => {
  const { id: orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("products.product")
      .lean();

    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `No order found with id ${orderId}` });
    }

    // Kiểm tra nếu người dùng đã đăng nhập và đảm bảo rằng đơn hàng thuộc về họ
    if (req.user && order.user.toString() !== req.user.userId.toString()) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to view this order." });
    }

    res.status(StatusCodes.OK).json({ order });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Server Error" });
  }
};


const updateOrderStatus = async (req, res) => {
  const { id: orderId } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  if (!orderStatus && !paymentStatus) {
    throw new CustomError.BadRequestError(
      "Please provide a valid order status or payment status"
    );
  }

  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  if (orderStatus && !validStatuses.includes(orderStatus)) {
    throw new CustomError.BadRequestError("Invalid order status");
  }

  const validPaymentStatuses = ["Pending", "Paid", "Failed", "Refunded"];
  if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
    throw new CustomError.BadRequestError("Invalid payment status");
  }

  const updateData = {};
  if (orderStatus) updateData.orderStatus = orderStatus;
  if (paymentStatus) updateData.paymentStatus = paymentStatus;

  if (orderStatus === "Delivered") {
    const generateWarrantyCode = () => {
      return `W-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    };

    const order = await Order.findById(orderId).select("products");

    const updatedProducts = await Promise.all(
      order.products.map(async (product) => {
        const productDetails = await Product.findById(product.product);

        if (productDetails.warranties.length !== 0) {
          const listValue = [];
          for (const element of productDetails.warranties) {
            if(product.warrantyIds.length > 0 && product.warrantyIds.includes(element)) {
              const warrantyDetails = await Warranty.findById(element);
              listValue.push({
                idWarranty: element,
                endDate: warrantyDetails.calculateEndDate(),
              });
            }
          }

          if(listValue.length > 0) {
            product.datesWarranty = listValue;
            product.codeWarranty = generateWarrantyCode();
          }
        }

        return product;
      })
    );

    updateData.products = updatedProducts;
  }

  const order = await Order.findByIdAndUpdate(orderId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    throw new CustomError.BadRequestError(`No order with id ${orderId}`);
  }

  res.status(StatusCodes.OK).json({ order });
};

const deleteOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findByIdAndDelete(orderId);

  if (!order || order.user.toString() !== req.user.userId.toString()) {
    throw new CustomError.BadRequestError(`No order with id ${orderId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Order successfully removed" });
};

const getOrdersByStatus = async (req, res) => {
  const { status } = req.query;

  if (!status) {
    throw new CustomError.BadRequestError("Please provide order status");
  }

  const validStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  if (!validStatuses.includes(status)) {
    throw new CustomError.BadRequestError("Invalid order status");
  }

  try {
    const orders = await Order.find({
      orderStatus: status,
      user: req.user.userId,
    });
    res.status(StatusCodes.OK).json({ total_orders: orders.length, orders });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

// Create order with vnpay
const vnpay = new VNPay({
  tmnCode: "H0CR4KOU",
  secureSecret: "BK3LD51V5KHBV5TWWNYNQGN0XASUV7ZU",
  vnpayHost: 'https://sandbox.vnpayment.vn',
  testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
  hashAlgorithm: 'SHA512', // tùy chọn
  enableLog: true, // tùy chọn
  loggerFn: ignoreLogger, // tùy chọn
  endpoints: {
      paymentEndpoint: 'paymentv2/vpcpay.html',
      queryDrRefundEndpoint: 'merchant_webapi/api/transaction',
      getBankListEndpoint: 'qrpayauth/api/merchant/get_bank_list',
  }, // tùy chọn
});

const createOrderWithVnpay = async (req, res) => {
  const {totalPrice, orderId} = req.body;

  // Time End
  const timeEnd = new Date();
  timeEnd.setMinutes(timeEnd.getMinutes() + 30);

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'Order not found' });
  }

  console.log(order);


  try {
    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: totalPrice,
      vnp_IpAddr: '13.160.92.202',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan don hang 123456',
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: `http://localhost:5173/cart/checkout/order-received/${orderId}`,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(timeEnd),
    });
  
    res.status(StatusCodes.OK).json({ paymentUrl });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
  getOrderCurrentUser,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder,
  getOrdersByStatus,
  getAllOrders,
  createOrderWithVnpay
};
