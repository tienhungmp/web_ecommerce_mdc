import React, { useState } from "react";

const CouponForm = ({ getDiscountByName }) => {
  const [couponCode, setCouponCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [discount, setDiscount] = useState(null);

  const applyCoupon = async () => {
    setErrorMessage(""); // Reset error message
    try {
      const discountData = await getDiscountByName(couponCode);
      setDiscount(discountData);
    } catch (error) {
      setErrorMessage("Failed to apply coupon. Please try again.");
    }
  };

  return (
   <div className="flex flex-col gap-2 my-6">
    <form
      className="flex h-8 gap-4 justify-between lg:justify-start"
      onSubmit={(e) => {
        e.preventDefault();
        applyCoupon();
      }}
    >
      <input
        placeholder="Nhập mã giảm giá"
        className="text-xs lg:text-sm w-56 lg:w-72 border focus:outline-none rounded-md px-4 focus:border-primary"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)} // Update state on input change
      />
      <button
        type="submit"
        className="text-xs lg:text-sm gap-3 px-3 py-2 lg:px-4 lg:py-2 tracking-wide bg-transparent flex items-center font-medium hover:bg-primary hover:text-white border-primary border rounded-md text-primary"
      >
        Áp dụng
      </button>
      
    </form>
    {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
      {discount && <p className="text-green-500 text-xs">Discount applied: {discount.name}!</p>}
   </div>
  );
};

export default React.memo(CouponForm);