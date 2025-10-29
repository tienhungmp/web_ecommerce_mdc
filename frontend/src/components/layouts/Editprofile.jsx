import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SummaryApi } from "../../common";
import axios from "axios";
import Loading from "../loading/Loading";
import { toast } from "react-toastify";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Importing icons

const EditProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [formData1, setFormData1] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingPW, setLoadingPW] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Lấy thông tin người dùng từ API
  const showUser = async (id) => {
    try {
      const url = SummaryApi.getUser.url.replace(":id", id);
      const { data } = await axios({
        url: url,
        method: SummaryApi.getUser.method,
        withCredentials: true,
      });
      setUser(data.user);
    } catch (error) {
      toast.error("Failed to load user data.");
    }
  };

  useEffect(() => {
    showUser(id);
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData1({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: user?.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const isChanged =
      formData1.name !== user?.name ||
      formData1.phone !== user?.phone ||
      formData1.email !== user?.email ||
      formData1.address !== user?.address;

    if (!isChanged) {
      toast.warning("Chưa có thay đổi thông tin người dùng");
      return;
    }

    if (!formData1.name || !formData1.email || !formData1.phone) {
      toast.error("Vui lòng điền vào tất cả các trường bắt buộc.");
      return;
    }

    setLoading(true); // Bắt đầu loading
    try {
      const updatedData = { ...formData1 };
      await axios({
        url: SummaryApi.editUser.url,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        data: updatedData,
      });

      toast.success("User successfully updated.");
      showUser(id);
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };


  const handleChangePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Vui lòng điền vào tất cả các trường.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      setLoadingPW(true);
      await axios({
        url: SummaryApi.changePassword.url,
        method: SummaryApi.changePassword.method,
        withCredentials: true,
        data: { oldPassword: currentPassword, newPassword },
      });

      toast.success("Mật khẩu đã được thay đổi thành công.");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || "Đã xảy ra lỗi. Vui lòng thử lại.";
      toast.error(errorMsg);
    } finally {
      setTimeout(() => setLoadingPW(false), 800);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="shadow-md h-full w-full p-4 lg:p-10 space-y-8 mb-8">
      <h1 className="text-xl text-primary">Chỉnh sửa hồ sơ của bạn</h1>
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {["name", "phone", "email", "address"].map((field, index) => (
          <div
            key={index}
            className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1"
          >
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <label htmlFor={field} className="bg-white text-gray-600 px-1">
                {field === "name" && "Tên *"}
                {field === "phone" && "Số điện thoại *"}
                {field === "email" && "Email *"}
                {field === "address" && "Địa chỉ *"}
              </label>
            </div>
            <input
              id={field}
              name={field}
              type="text"
              value={formData1[field]}
              onChange={handleChange}
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </div>
        ))}
        <div className="col-span-1 lg:col-span-2 w-full flex items-center justify-end gap-4">
          <button
            type="button"
            className={`text-sm flex items-center gap-3 px-5 py-2.5 font-semibold tracking-wide bg-transparent text-primary border ${
              loading ? "opacity-50 cursor-not-allowed" : "border-primary"
            } hover:bg-primary hover:text-white rounded-md`}
            onClick={handleSave}
            disabled={loading}
          >
            Lưu thay đổi {loading && <Loading />}
          </button>
        </div>
      </form>

      <hr />

      <h1 className="text-xl text-primary">Thay đổi mật khẩu</h1>
      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {["currentPassword", "newPassword", "confirmPassword"].map((field, index) => (
          <div
            key={index}
            className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1"
          >
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <label htmlFor={field} className="bg-white text-gray-600 px-1">
                {field === "currentPassword" && "Mật khẩu hiện tại *"}
                {field === "newPassword" && "Mật khẩu mới *"}
                {field === "confirmPassword" && "Xác nhận mật khẩu *"}
              </label>
            </div>
            <input
              id={field}
              name={field}
              type={showPassword[field] ? "text" : "password"} // Show password toggle
              value={passwordData[field]}
              onChange={handlePasswordChange}
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility(field)} // Toggle password visibility
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword[field] ? <HiEyeOff /> : <HiEye />} {/* Toggle icon */}
            </button>
          </div>
        ))}
        <div className="col-span-1 lg:col-span-3 w-full flex items-center justify-end gap-4">
          <button
            type="button"
            className={`text-sm flex items-center gap-2 px-5 py-2.5 font-semibold tracking-wide bg-transparent text-primary border ${
              loading ? "opacity-50 cursor-not-allowed" : "border-primary"
            } hover:bg-primary hover:text-white rounded-md`}
            onClick={handleChangePassword}
            disabled={loading}
          >
            Lưu thay đổi {loadingPW && <Loading />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
