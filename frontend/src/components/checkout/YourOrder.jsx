import React, { useContext, useState, useEffect } from "react";
import { backendDomain, SummaryApi } from "../../common";
import Context from "../../context";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function YourOrder({ orders, coupon, onTotalChange }) {

  const [searchParams] = useSearchParams();
const bhv = searchParams.get("bhv"); // Lấy giá trị bhv từ query params
const additionalPrice = bhv === "true" ? 1000000 : 0;
  
  const { userData } = useContext(Context);
  const [products, setProducts] = useState({});

  const showProduct = async (productId) => {
    try {
      const url = SummaryApi.getProductById.url.replace(":id", productId);

      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      const dataApi = dataResponse.data;
      setProducts((prev) => ({
        ...prev,
        [productId]: dataApi.product,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      orders.forEach((order) => {
        if (!products[order.productId]) {
          showProduct(order.productId);
        }
      });
    }
  }, [orders, userData, products]);

  let subtotal = 0;
  if (userData) {
    subtotal = orders.reduce(
      (total, order) =>
        total +
        ((order?.product?.saleprice !== 0
          ? order?.product?.saleprice
          : order?.product.price) + additionalPrice) * order?.quantity,
      0
    );
  } else {
    subtotal = orders.reduce((total, order) => {
      if (order?.product) {
        return (
          total +
          ((order.product.saleprice !== 0
            ? order.product.saleprice
            : order.product.price) + additionalPrice) *
            order.quantity
        );
      } else {
        return total + order.price * order.quantity;
      }
    }, 0);
  }

  const discount = coupon
    ? coupon.discountType === "percentage"
      ? (subtotal * coupon.value) / 100
      : coupon.value
    : 0;

  const totalPrice = subtotal - discount;

  // Gọi callback để truyền totalPrice ngược lên component cha
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(totalPrice);
    }
  }, [totalPrice, onTotalChange]);

  const getProductPrice = (product) => {
    // Kiểm tra nếu có giá trị bảo hành vàng
    const bhv = searchParams.get("bhv");
    const additionalPrice = bhv === "true" ? 1000000 : 0;
  
    return product?.saleprice !== 0
      ? product?.saleprice + additionalPrice
      : product?.price + additionalPrice;
  };
  

  return (
    <div className="space-y-8 shadow-md bg-slate-100 px-4 py-2">
      <h1 className="text-xl lg:text-4xl my-4"> Đơn hàng của bạn</h1>
      <hr />
      {orders.map((order) => {
        const productId = order?.productId;
        const product = userData ? order?.product : products[productId];
        const productImage = product?.avatar || order?.product?.avatar;
        const productName = product?.name || order?.product?.name;
        const productPrice =
          getProductPrice(product) || getProductPrice(order?.product);
        const quantity = order?.quantity;
        const totalProductPrice = productPrice * quantity;

        return (
          <div
            key={productId}
            className="grid grid-cols-5 items-center gap-2 mb-4"
          >
            <div className="flex justify-end">
              {productImage && (
                <img
                  src={`${backendDomain}/${productImage}`}
                  alt={productName}
                  className="w-14 h-14"
                />
              )}
            </div>
            <div className="col-span-2 lg:col-span-3 flex flex-col justify-center">
              <h1 className="font-medium text-[12px] lg:text-[15px] line-clamp-2 lg:line-clamp-1">
                {productName}
              </h1>
              <p className="flex gap-3 text-[11px] lg:text-sm text-gray-500">
                <span>{productPrice?.toLocaleString()} đ</span> x{" "}
                <span>{quantity}</span>
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1 justify-end flex items-center font-medium text-[12px] lg:text-[15px]">
              {totalProductPrice?.toLocaleString()} đ
            </div>
          </div>
        );
      })}
      <hr />
      <div className="space-y-4 pb-4">
        <p className="text-sm lg:text-base flex justify-between pl-10">
          Tạm tính
          <span className="font-medium text-sm lg:text-[16px]">
            {subtotal?.toLocaleString()} đ
          </span>
        </p>
        {coupon && discount > 0 && (
          <p className="text-sm lg:text-base flex justify-between pl-10">
            Discount
            <span className="font-medium text-sm lg:text-[16px]">
              {coupon?.discountType === "percentage"
                ? `- ${discount?.toLocaleString()} đ (${coupon?.value}% off)`
                : `- ${discount?.toLocaleString()} đ`}
            </span>
          </p>
        )}
        <p className="text-sm lg:text-base flex justify-between pl-10">
          Vận chuyển
          <span className="font-medium text-sm lg:text-[16px]">Miễn phí</span>
        </p>
        <hr />
        <p className="text-sm lg:text-base flex justify-between pl-10">
          Tổng
          <span className="font-medium text-sm lg:text-[16px]">
            {totalPrice?.toLocaleString()} đ
          </span>
        </p>
      </div>
      <hr className="border-t-black" />
    </div>
  );
}

export default YourOrder;
