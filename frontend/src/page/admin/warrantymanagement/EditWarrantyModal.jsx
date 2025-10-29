import React, { useState, useEffect } from "react";

function EditWarrantyModal({ isOpen, onClose, warranty, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    warrantyType: "Standard",
    duration: "",
    durationUnit: "năm",
    coverage: "Repair",
    terms: "",
  });

  useEffect(() => {
    if (warranty) {
      setFormData({
        name: warranty?.name || "",
        description: warranty?.description || "",
        warrantyType: warranty?.warrantyType || "Standard",
        duration: warranty?.duration || "",
        durationUnit: warranty?.durationUnit || "năm",
        coverage: warranty?.coverage || "Repair",
        terms: warranty?.terms || "",
      });
    }
  }, [warranty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData, warranty?._id); // Gửi dữ liệu mới cho cha khi lưu
  };

  if (!isOpen) return null; // Nếu modal không mở thì không render gì

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Sửa mã bảo hành</h2>
        <form>
          {/* Name Field */}
          <div className="relative mb-4">
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            />
          </div>

          {/* Description Field */}
          <div className="relative mb-4">
            <label
              htmlFor="description"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Mô tả
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            />
          </div>

          {/* Warranty Type Field */}
          <div className="relative mb-4">
            <label
              htmlFor="warrantyType"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Thể loại
            </label>
            <select
              id="warrantyType"
              name="warrantyType"
              value={formData.warrantyType}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            >
              <option value="Standard">Standard</option>
              <option value="Extended">Extended</option>
              <option value="VIP">VIP</option>
              <option value="Comprehensive">Comprehensive</option>
              <option value="Partial">Partial</option>
            </select>
          </div>

          {/* Duration Field */}
          <div className="relative mb-4">
            <label
              htmlFor="duration"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Thời gian
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            />
          </div>

          {/* Duration Unit Field */}
          <div className="relative mb-4">
            <label
              htmlFor="durationUnit"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Đơn vị
            </label>
            <select
              id="durationUnit"
              name="durationUnit"
              value={formData.durationUnit}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            >
              <option value="tháng">Tháng</option>
              <option value="năm">Năm</option>
              <option value="ngày">Ngày</option>
              <option value="giờ">Giờ</option>
            </select>
          </div>

          {/* Coverage Field */}
          <div className="relative mb-4">
            <label
              htmlFor="coverage"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Phạm vi
            </label>
            <select
              id="coverage"
              name="coverage"
              value={formData.coverage}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            >
              <option value="Repair">Repair</option>
              <option value="Replacement">Replacement</option>
              <option value="Refund">Refund</option>
            </select>
          </div>

          {/* Terms Field */}
          <div className="relative mb-4">
            <label
              htmlFor="terms"
              className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
            >
              Terms
            </label>
            <textarea
              id="terms"
              name="terms"
              value={formData.terms}
              onChange={handleChange}
              className="w-full border rounded px-2 py-2 text-sm outline-none text-gray-700"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded mr-2"
              onClick={handleSave} // Save the changes
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded"
              onClick={onClose} // Close the modal without saving
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWarrantyModal;
