const mongoose = require("mongoose");
const Category = require("../models/categoryModel");

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

const clearCategoriesBeforeImport = async () => {
  try {
    await Category.deleteMany({});
    console.log("Đã xóa tất cả danh mục.");
  } catch (error) {
    console.log("Lỗi khi xóa danh mục:", error);
  }
};

const addParentCategories = async () => {
  const parentCategories = [
    { name: "Robot hút bụi", description: "Các loại robot hút bụi tốt nhất" },
    {
      name: "Máy lọc không khí",
      description:
        "Các loại máy lọc không khí an toàn bảo vệ sức khỏe tốt nhất",
    },
    { name: "Tivi", description: "Các loại tivi và thiết bị kết nối tivi" },
    {
      name: "Điện Thoại",
      description: "Các loại điện thoại di động và phụ kiện",
    },
    { name: "Laptop", description: "Máy tính xách tay và thiết bị liên quan" },
    { name: "Âm Thanh", description: "Thiết bị âm thanh như loa, tai nghe" },
    {
      name: "Đồng Hồ",
      description: "Các loại đồng hồ thông minh và đồng hồ thời trang",
    },
    {
      name: "Smarthome",
      description: "Thiết bị nhà thông minh và điều khiển từ xa",
    },
    {
      name: "Phụ Kiện",
      description: "Phụ kiện cho điện thoại, máy tính và thiết bị khác",
    },
    { name: "PC", description: "Máy tính để bàn và linh kiện" },
    { name: "Tivi", description: "Các loại tivi và thiết bị kết nối tivi" },
  ];

  try {
    const insertedCategories = await Category.insertMany(parentCategories);
    console.log("Inserted Parent Categories:", insertedCategories);
    console.log("Category cha đã được thêm thành công.");
  } catch (error) {
    console.log("Error adding parent categories:", error);
  } finally {
    mongoose.connection.close();
  }
};

clearCategoriesBeforeImport().then(() => {
  addParentCategories();
});
