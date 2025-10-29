const mongoose = require("mongoose");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error));

const clearProductsBeforeImport = async () => {
  try {
    // Xóa tất cả sản phẩm trước khi thêm sản phẩm mới
    await Product.deleteMany({});
    console.log("Deleted all existing products.");
  } catch (error) {
    console.log("Error deleting products:", error);
  }
};

const addProducts = async () => {
  try {
    // Lấy danh sách các category cha (không cần category con nữa)
    const parentCategories = await Category.find({ parentCategory: null }); // Lấy các category cha
    if (parentCategories.length === 0) {
      console.log("No parent categories found.");
      return;
    }

    // Duyệt qua các category cha để thêm sản phẩm
    for (let i = 0; i < 30; i++) { // Lặp 30 lần để tạo 30 sản phẩm
      const parent = parentCategories[Math.floor(Math.random() * parentCategories.length)]; // Lấy ngẫu nhiên category cha

      // Tạo giá gốc trong khoảng 100,000 đến 2,000,000
      const price = Math.floor(Math.random() * (9000000 - 100000 + 1) + 500000);

      // Tạo giá khuyến mãi, giảm từ 10% đến 30% so với giá gốc
      const discountPercentage = Math.random() * (0.3 - 0.1) + 0.1; // Giảm từ 10% đến 30%
      const saleprice = Math.floor(price * (1 - discountPercentage)); // Giá khuyến mãi

      const newProduct = new Product({
        name: `Product ${i + 1} for ${parent.name}`,
        price, // Giá gốc
        saleprice, // Giá khuyến mãi
        inventory: Math.floor(Math.random() * 100 + 1),
        description: `Description for product in category ${parent.name}`,
        mainCategory: parent._id,
        flashsale: Math.random() > 0.5,
        company: "Xiaomi",
        featured: true,
        freeShipping: false,
        variants: [
          {
            options: [
              { name: "Color", value: "Red" },
              { name: "Storage", value: "64GB" },
            ],
          },
        ],
        colors: ["#FF0000", "#0000FF"], // Màu sắc sản phẩm
        user: "67338729c06ad7b83afa8809", // ID người dùng (có thể lấy từ database)
      });

      // Lưu sản phẩm vào cơ sở dữ liệu
      await newProduct.save();
      console.log(`Sản phẩm ${newProduct.name} đã được thêm vào ${parent.name}`);
    }

    console.log("All products added successfully!");
  } catch (error) {
    console.log("Error adding products:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Xóa các sản phẩm trước và thêm sản phẩm mới
clearProductsBeforeImport().then(() => {
  addProducts();
});
