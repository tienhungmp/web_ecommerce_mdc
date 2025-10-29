import React, { useCallback, useEffect, useState } from "react";
import AddCoupons from "./AddCoupons";
import CouponsManagementable from "./CouponsManagementable";
import axios from "axios";
import { SummaryApi } from "../../../common";

function CouponsManagement() {
  const [coupons, setCoupons] = useState([]);

  const addNewCoupon = async (couponData) => {
    try {
      const response = await axios({
        url: SummaryApi.addNewCoupon.url,
        method: SummaryApi.addNewCoupon.method,
        data: couponData,
        withCredentials: true,
      });

      alert("Coupon added successfully!");
      showCoupons(); // Gọi lại sau khi thêm mới
    } catch (error) {
      console.error("Error adding coupon:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const showCoupons = useCallback(async () => {
    try {
      const response = await axios({
        url: SummaryApi.getAllCoupon.url,
        method: SummaryApi.getAllCoupon.method,
        withCredentials: true,
      });
      setCoupons(response.data.discounts);
      console.log("response", response.data.discounts);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      alert("An error occurred. Please try again later.");
    }
  }, []);

  const handleRemoveCoupon = useCallback(
    async (id) => {
      if (!window.confirm("Bạn có chắc muốn xóa mã giảm giá này không?")) return;
      try {
        const url = SummaryApi.removeCouponById.url.replace(":id", id);
        await axios({
          url,
          method: SummaryApi.removeCouponById.method,
          withCredentials: true,
        });

        alert("Mã giảm giá đã được xóa thành công!");
        showCoupons(); // Gọi lại sau khi xóa
      } catch (error) {
        console.error("Lỗi khi xóa mã giảm giá:", error);
        alert("Không thể xóa mã giảm giá.");
      }
    },
    [showCoupons]
  );

  useEffect(() => {
    showCoupons();
  }, [showCoupons]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Quản lí mã giảm giá</h1>
      <AddCoupons onSave={addNewCoupon} />
      <CouponsManagementable coupons={coupons} onDelete={handleRemoveCoupon} />
    </div>
  );
}

export default CouponsManagement;
