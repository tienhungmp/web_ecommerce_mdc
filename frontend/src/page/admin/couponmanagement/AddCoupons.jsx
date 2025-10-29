import React, { useState } from "react";

function AddCoupons({ onSave }) {
  const [newCoupon, setNewCoupon] = useState({
    name: "",
    discountType: "",
    value: "",
    validFrom: "",
    validUntil: "",
    description: "",
    isActive: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Xử lý giá trị của "value" theo discountType
    if (name === "value") {
      if (newCoupon.discountType === "percentage") {
        if (!/^\d{1,3}$/.test(value) || value > 100) {
          setError("Percentage value must be between 0 and 100.");
          return;
        }
      } else if (newCoupon.discountType === "fixed") {
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
          setError("Fixed value must be a positive number.");
          return;
        }
      }
    }

    // Kiểm tra validFrom và validUntil
    if (name === "validUntil" && newCoupon.validFrom) {
      if (new Date(value) <= new Date(newCoupon.validFrom)) {
        setError("End date must be after start date.");
        return;
      }
    }

    if (name === "validFrom" && newCoupon.validUntil) {
      if (new Date(newCoupon.validUntil) <= new Date(value)) {
        setError("Start date must be before end date.");
        return;
      }
    }

    setError(""); // Xóa lỗi nếu nhập đúng
    setNewCoupon((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSave = () => {
    if (!newCoupon.name || !newCoupon.discountType || !newCoupon.value) {
      setError("Please fill in all required fields.");
      return;
    }

    setError("");
    onSave(newCoupon);
    setNewCoupon({
      name: "",
      discountType: "",
      value: "",
      validFrom: "",
      validUntil: "",
      description: "",
      isActive: "",
    });
  };

  const handleReset = () => {
    setNewCoupon({
      name: "",
      discountType: "",
      value: "",
      validFrom: "",
      validUntil: "",
      description: "",
      isActive: "",
    });
    setError("");
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {/* Code */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="name" className="bg-white text-gray-600 px-1">
              Mã
            </label>
          </div>
          <input
            id="name"
            name="name"
            type="text"
            value={newCoupon.name}
            onChange={handleInputChange}
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>

        {/* Type */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="discountType" className="bg-white text-gray-600 px-1">
              Thể loại
            </label>
          </div>
          <select
            id="discountType"
            name="discountType"
            value={newCoupon.discountType}
            onChange={handleInputChange}
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full bg-white"
          >
            <option value="" disabled>
              -- Chọn --
            </option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>

        {/* Value */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="value" className="bg-white text-gray-600 px-1">
              Giảm giá
            </label>
          </div>
          <input
            id="value"
            name="value"
            type="text"
            value={newCoupon.value}
            onChange={handleInputChange}
            placeholder={
              newCoupon.discountType === "percentage"
                ? "Enter percentage (0-100)"
                : "Enter fixed amount"
            }
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>

        {/* Valid From */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="validFrom" className="bg-white text-gray-600 px-1">
              Từ ngày
            </label>
          </div>
          <input
            id="validFrom"
            name="validFrom"
            type="date"
            value={newCoupon.validFrom}
            onChange={handleInputChange}
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>

        {/* Valid Until */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="validUntil" className="bg-white text-gray-600 px-1">
              Đến ngày
            </label>
          </div>
          <input
            id="validUntil"
            name="validUntil"
            type="date"
            value={newCoupon.validUntil}
            onChange={handleInputChange}
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>

        {/* Status */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="isActive" className="bg-white text-gray-600 px-1">
              Trạng thái
            </label>
          </div>
          <select
            id="isActive"
            name="isActive"
            value={newCoupon.isActive}
            onChange={handleInputChange}
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full bg-white"
          >
            <option value="" disabled>
             -- Chọn --
            </option>
            <option value="true">Active</option>
            <option value="false">Deactive</option>
          </select>
        </div>
        <div className="border relative rounded p-1 col-span-6">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="description" className="bg-white text-gray-600 px-1">
            description
            </label>
          </div>
          <input
            id="description"
            name="description"
            type="text"
            value={newCoupon.description}
            onChange={handleInputChange}
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>
          <div className="col-span-6 text-red-500 text-xs mt-1">{error}</div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 my-1">
        <button
          onClick={handleReset}
          type="button"
          className="px-2 py-1 bg-white text-primary border border-primary rounded hover:bg-primary-dark focus:ring-2 focus:ring-primary-light transition"
        >
          Cài lại
        </button>
        <button
          onClick={handleSave}
          type="button"
          className="px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark focus:ring-2 focus:ring-primary-light transition"
        >
          Lưu mã
        </button>
      </div>
    </div>
  );
}

export default AddCoupons;
