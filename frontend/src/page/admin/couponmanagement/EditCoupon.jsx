import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { SummaryApi } from "../../../common";

function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState({});
  const [newCoupon, setNewCoupon] = useState({
    name: "",
    discountType: "",
    value: "",
    validFrom: "",
    validUntil: "",
    isActive: "",
    description: "",
  });

  const getCouponById = async (id) => {
    try {
      const response = await axios({
        url: SummaryApi.editCoupon.url.replace(":id", id),
        method: SummaryApi.editCoupon.method,
        withCredentials: true,
      });
      const data = response.data.discount;
      setCoupon(data);
      setNewCoupon({
        name: data.name || "",
        discountType: data.discountType || "",
        value: data.value || "",
        validFrom: data.validFrom
          ? new Date(data.validFrom).toISOString().split("T")[0]
          : "",
        validUntil: data.validUntil
          ? new Date(data.validUntil).toISOString().split("T")[0]
          : "",
        isActive: data.isActive ? "true" : "false",
        description: data.description || "",
      });
    } catch (error) {
      console.error("Error fetching coupon:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    getCouponById(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "value") {
        if (newCoupon.discountType === "percentage") {
          if (!/^\d{1,3}$/.test(value) || value > 100) {
            alert("Percentage value must be between 0 and 100.");
            return;
          }
        } else if (newCoupon.discountType === "fixed") {
          if (!/^\d+(\.\d{0,2})?$/.test(value)) {
            alert("Fixed value must be a positive number.");
            return;
          }
        }
      }
  
      // Kiểm tra validFrom và validUntil
      if (name === "validUntil" && newCoupon.validFrom) {
        if (new Date(value) <= new Date(newCoupon.validFrom)) {
          alert("End date must be after start date.");
          return;
        }
      }
  
      if (name === "validFrom" && newCoupon.validUntil) {
        if (new Date(newCoupon.validUntil) <= new Date(value)) {
             if (name === "value") {
      if (newCoupon.discountType === "percentage") {
        if (!/^\d{1,3}$/.test(value) || value > 100) {
          alert("Percentage value must be between 0 and 100.");
          return;
        }
      } else if (newCoupon.discountType === "fixed") {
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
          alert("Fixed value must be a positive number.");
          return;
        }
      }
    }

    // Kiểm tra validFrom và validUntil
    if (name === "validUntil" && newCoupon.validFrom) {
      if (new Date(value) <= new Date(newCoupon.validFrom)) {
        alert("End date must be after start date.");
        return;
      }
    }

    if (name === "validFrom" && newCoupon.validUntil) {
      if (new Date(newCoupon.validUntil) <= new Date(value)) {
        alert("Start date must be before end date.");
        return;
      }
    }("Start date must be before end date.");
          return;
        }
      }
    setNewCoupon((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setNewCoupon({
      name: coupon.name || "",
      discountType: coupon.discountType || "",
      value: coupon.value || "",
      validFrom: coupon.validFrom
        ? new Date(coupon.validFrom).toISOString().split("T")[0]
        : "",
      validUntil: coupon.validUntil
        ? new Date(coupon.validUntil).toISOString().split("T")[0]
        : "",
      isActive: coupon.isActive ? "true" : "false",
      description: coupon.description || "",
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...newCoupon,
        isActive: newCoupon.isActive === "true",
      };
      await axios({
        url: SummaryApi.updateCoupon.url.replace(":id", id),
        method: SummaryApi.updateCoupon.method,
        data: payload,
        withCredentials: true,
      });
      alert("Coupon updated successfully!");
    } catch (error) {
      console.error("Error updating coupon:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4">
        {/* Code */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="name" className="bg-white text-gray-600 px-1">
              Code
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
            <label
              htmlFor="discountType"
              className="bg-white text-gray-600 px-1"
            >
              Type
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
              Select type
            </option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>

        {/* Value */}
        <div className="border relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="value" className="bg-white text-gray-600 px-1">
              Discount
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
              Date from
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
              Date to
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
              Status
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
              Select status
            </option>
            <option value="true">Active</option>
            <option value="false">DeActive</option>
          </select>
        </div>

        {/* Description */}
        <div className="border relative rounded p-1 col-span-6">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label
              htmlFor="description"
              className="bg-white text-gray-600 px-1"
            >
              Description
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
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-4 my-4">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="px-2 py-1 bg-white text-primary border border-primary rounded hover:bg-primary-dark focus:ring-2 focus:ring-primary-light transition"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          type="button"
          className="px-2 py-1 bg-primary text-white rounded hover:bg-primary-dark focus:ring-2 focus:ring-primary-light transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditCoupon;
