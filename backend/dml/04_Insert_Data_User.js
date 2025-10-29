const mongoose = require("mongoose");
const User = require("../models/userModel"); // Import mô hình User

// Kết nối tới MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Xóa tất cả user trước khi import (tuỳ chọn)
const clearUsersBeforeImport = async () => {
  try {
    await User.deleteMany({});
    console.log("Deleted all existing users.");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

// Thêm danh sách user mới
const addUsers = async () => {
  const users = [
    {
      name: "user", // Tài khoản user
      email: "user@gmail.com",
      address: "456 User St, User City",
      phone: "444-555-6666",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St, Cityville",
      phone: "123-456-7890",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "456 Elm St, Townsville",
      phone: "987-654-3210",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "789 Oak St, Villagetown",
      phone: "321-654-9870",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      address: "321 Pine St, Hamletton",
      phone: "654-321-9876",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Chris Green",
      email: "chris.green@example.com",
      address: "654 Maple St, Countryside",
      phone: "111-222-3333",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Diana Blue",
      email: "diana.blue@example.com",
      address: "777 Birch St, Seaside",
      phone: "444-555-6666",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Evan White",
      email: "evan.white@example.com",
      address: "888 Cedar St, Riverside",
      phone: "777-888-9999",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Fiona Black",
      email: "fiona.black@example.com",
      address: "999 Spruce St, Highlands",
      phone: "000-111-2222",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "George Yellow",
      email: "george.yellow@example.com",
      address: "111 Willow St, Lowlands",
      phone: "333-444-5555",
      password: "Abcd1234",
      role: "user",
    },
    {
      name: "Hannah Pink",
      email: "hannah.pink@example.com",
      address: "222 Aspen St, Uptown",
      phone: "666-777-8888",
      password: "Abcd1234",
      role: "user",
    },
  ];

  try {
    await User.insertMany(users); // Thêm danh sách user
    console.log("10 users have been added successfully!");
  } catch (error) {
    console.error("Error adding users:", error);
  } finally {
    mongoose.connection.close(); // Đóng kết nối
  }
};

// Thực thi
const importUsers = async () => {
  await clearUsersBeforeImport();
  await addUsers();
};

importUsers();
