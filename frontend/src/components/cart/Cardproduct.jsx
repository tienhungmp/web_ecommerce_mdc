/* eslint-disable react/prop-types */
import { Rating } from "@material-tailwind/react";
import { CiHeart } from "react-icons/ci";
import { PiEyeThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { removeAccents } from "../../utils/helpers";
import noimages from "../../assets/images/noimages.jpg";
import axios from "axios";
import { backendDomain, SummaryApi } from "../../common";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import Context from "../../context";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
const Cardproduct = ({ item }) => {
  console.log("item warranties", item.warranties);

  const { setCart, userData } = useContext(Context); // Lấy setCart từ context
  const [warrantyId, setWarrantyId] = useState("");

  const getWarranty = async (idWarranty) => {
    try {
      const response = await axios({
        url: SummaryApi.getWarrantyById.url.replace(":id", idWarranty),
        method: SummaryApi.getWarrantyById.method,
        withCredentials: true,
      });

      // Xử lý dữ liệu trả về từ API
      console.log("Thông tin bảo hành:", response.data.warranty.name);

      return response.data.warranty.name; // Trả về tên bảo hành
    } catch (error) {
      console.error("Lỗi khi lấy thông tin bảo hành:", error);
      throw error; // Có thể ném lỗi nếu muốn xử lý tại nơi gọi hàm này
    }
  };

  const addToCart = async () => {
    const cartKey = "cart";
    
    try {
      // Chờ kết quả từ getWarranty để so sánh bảo hành vàng
      const warrantyName = await getWarranty(item.warranties[0]);
      console.log("warrantyName", warrantyName.toLowerCase());
  
      // Cập nhật warrantyId sau khi có tên bảo hành
      let selectedWarrantyId;
      if (warrantyName.toLowerCase() === "bảo hành vàng") {
        selectedWarrantyId = item.warranties[1]; // Chọn bảo hành thường
      } else {
        selectedWarrantyId = item.warranties[0]; // Chọn bảo hành vàng
      }
  
      // Cập nhật state warrantyId sau khi chọn bảo hành
      setWarrantyId(selectedWarrantyId);
      console.log("selectedWarrantyId", selectedWarrantyId);
  
      if (!userData) {
        const cartFromStorage = JSON.parse(localStorage.getItem(cartKey)) || [];
        const existingProductIndex = cartFromStorage.findIndex(
          (product) => product.productId === item._id
        );
  
        if (existingProductIndex !== -1) {
          cartFromStorage[existingProductIndex].quantity += 1;
        } else {
          cartFromStorage.push({
            productId: item._id,
            quantity: 1,
            price: item.saleprice !== 0 ? item.saleprice : item.price,
            warrantyIds: selectedWarrantyId, // Gắn ID bảo hành đã chọn vào giỏ
          });
        }
  
        localStorage.setItem(cartKey, JSON.stringify(cartFromStorage));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng");
        setCart({ products: cartFromStorage });
        return;
      }
  
      if (item.inventory === 0) {
        toast.error("Sản phẩm đã hết hàng");
        return;
      }
  
      const data = {
        productId: item._id,
        quantity: 1,
        price: item.saleprice !== 0 ? item.saleprice : item.price,
        variantId: null,
        warrantyIds: selectedWarrantyId, // Gắn ID bảo hành đã chọn vào giỏ
      };
  
      const response = await axios({
        url: SummaryApi.addToCart.url,
        method: SummaryApi.addToCart.method,
        data: data,
        withCredentials: true,
      });
  
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
      setCart(response.data.cart);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  

  return (
    <div className="relative flex w-full max-w-[12rem] lg:max-w-[16rem] h-full flex-col overflow-hidden rounded-md border border-gray-100 bg-white shadow-md group/cart">
      <div className="relative mx-2 mt-2">
        <Link
          to={`/products/${removeAccents(item.name).replaceAll(" ", "-")}`}
          state={{ id: item?._id }}
          className={`flex h-36 lg:h-56 overflow-hidden rounded-md ${
            item.inventory === 0 ? "pointer-events-none" : ""
          }`}
        >
          <img
            className="object-cover w-full group-hover/cart:scale-105 transition-all duration-500 ease-in-out"
            src={
              item.avatar?.length > 0
                ? `${backendDomain}${item.avatar}`
                : noimages
            }
            alt={item.name || "Product Image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noimages;
            }}
          />
        </Link>
        {item.inventory === 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center text-white text-lg font-medium">
            Hết hàng
          </div>
        )}
        {item?.saleprice !== 0 && (
          <span className="absolute top-0 left-0 m-1 lg:m-2 rounded-md bg-primary px-1 lg:px-3 py-1 text-center text-[10px] lg:text-[12px] text-white">
            {((1 - item?.saleprice / item?.price) * 100).toFixed(0) || 0}%
          </span>
        )}
        {item.inventory !== 0 && (
          <button
            className="absolute bottom-0 right-0 left-0 opacity-0 group-hover/cart:opacity-100 group-hover/cart:translate-y-0 transform translate-y-2 transition-all duration-500 ease-in-out flex w-full items-center justify-center rounded-md bg-primary px-2 py-2 text-center text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-1 focus:ring-blue-300"
            onClick={addToCart}
            disabled={item.inventory === 0}
          >
            Add to cart
          </button>
        )}

        {/* <div className="absolute top-1 right-2 opacity-0 transform translate-y-2 group-hover/cart:opacity-100 group-hover/cart:translate-y-0 transition-all duration-300 ease-in-out">
          <span className="flex justify-center items-center w-8 h-8 rounded-full my-1 bg-gray-100 cursor-pointer hover:text-primary transition-colors duration-200">
            <CiHeart size={20} />
          </span>
          <span className="flex justify-center items-center w-8 h-8 rounded-full my-1 bg-gray-100 cursor-pointer hover:text-primary transition-colors duration-200">
            <PiEyeThin size={20} />
          </span>
        </div> */}
      </div>
      <div className="mt-4 px-2 lg:px-5 pb-5">
        <Link
          to={`/products/${removeAccents(item?.name).replaceAll(" ", "-")}`}
          state={{ id: item?._id }}
        >
          <h5 className="text-[12px] lg:text-[15px] font-medium tracking-tight text-slate-900 line-clamp-1">
            {item?.name}
          </h5>
        </Link>
        <div>
          <p className="pb-1 flex flex-col items-start gap-1">
            <span className="font-medium text-primary text-[14px]">
              {(item?.saleprice || item?.price)?.toLocaleString()} VND
            </span>
            {item?.saleprice !== 0 && (
              <span className="lg:text-[12px] text-gray-400 text-[10px] line-through">
                {item?.price?.toLocaleString()} VND
              </span>
            )}
          </p>
          <div className="flex items-center mb-4">
            {item?.numOfReviews > 0 && (
              <div className="">
                <div className="flex items-center">
                  <span className="text-gray-600 text-xs">
                    {item?.averageRating?.toFixed(1)}
                  </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>
                      {item?.averageRating >= star ? (
                        <AiFillStar className="text-yellow-500" size={18} />
                      ) : item?.averageRating >= star - 0.5 ? (
                        <AiFillStar
                          className="text-yellow-500"
                          size={18}
                          style={{ clipPath: "inset(0 50% 0 0)" }}
                        />
                      ) : (
                        <AiOutlineStar className="text-gray-400" size={18} />
                      )}
                    </span>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">
                  ({item?.numOfReviews} reviews)
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardproduct;
