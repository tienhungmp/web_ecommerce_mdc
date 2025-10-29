import React from "react";

const OrderSummary = ({ cart }) => {
  const totalAmount = cart.products.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="bg-gray-100 grid grid-cols-5 gap-2 lg:gap-8 justify-items-end rounded-md p-4 bg-white border-none outline-none py-3 shadow-md text-[14px] lg:text-base col-span-5">
      <span className="col-span-4 text-left font-medium">Total</span>
      <span className="col-span-1 text-left font-semibold w-full">{cart?.totalPrice?.toLocaleString() || totalAmount.toLocaleString()} đ</span>
    </div>
  );
};

export default React.memo(OrderSummary);
