import React, { useState, useEffect, useCallback } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
import { backendDomain, SummaryApi } from "../../common";
import axios from "axios";
import { toast } from "react-toastify";

export const Cardshopping = ({ item, onQuantityChange, onRemoveItem }) => {
  const [inventory, setInventory] = useState(0);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  console.log("item", item);
  

  // Fetch product details and inventory status
  const showProduct = async (productId) => {
    try {
      const url = SummaryApi.getProductById.url.replace(":id", productId);
      
      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getProductById.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
      setInventory(dataApi.product.inventory);
      setProduct(dataApi.product)
      console.log("Data",dataApi);
      
      console.log("Inventory:", dataApi.product.inventory);

      // Adjust quantity if it's greater than available inventory
      if (quantity > dataApi?.product?.inventory) {
        setQuantity(dataApi?.product?.inventory);
        toast.error(
          `Số lượng của ${dataApi?.product?.name} đã được giảm xuống ${dataApi.product.inventory} vì kho hàng`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Recalculate subtotal
  const subtotal =
    (product?.saleprice || product?.price || 0) * quantity;

  // Synchronize quantity and inventory when either of them changes
  useEffect(() => {
    setQuantity(item?.quantity || 1);
  }, [item?.quantity]);

  useEffect(() => {
    if (item?.product?._id) {
          showProduct(item?.product?._id);
    }else{
      showProduct(item?.productId);
      
    }
  }, [item?.product?._id || item?.productId]);

  // Handle quantity change and check against inventory
  const handleQuantityChange = useCallback(
    (e) => {
      const value = Math.max(1, parseInt(e.target.value, 10));
      if (!isNaN(value)) {
        if (value > inventory) {
          toast.error(`Số lượng của ${dataApi?.product?.name} vượt quá kho`);
        } else {
          setQuantity(value);
          if (onQuantityChange) {
            if(item?.product?._id){
              onQuantityChange(item?.product?._id, value);
            }
            else{
              onQuantityChange(product?._id, value);
            }
          }
        }
      }
    },
    [inventory, item?.product?._id, onQuantityChange]
  );

  // Handle removal of item from cart
  const handleRemoveItem = useCallback(() => {
    if (item?.product?._id && onRemoveItem) {
      onRemoveItem(item.product._id);
    } else {
      onRemoveItem(product._id);
    }
  }, [item?.product?._id, onRemoveItem, product._id]);

  return (
    <div className="relative grid grid-cols-5 gap-2 lg:gap-8 px-4 mt-2 bg-white border-none outline-none py-3 shadow-md text-[14px] lg:text-base group">
      {/* Product details */}
      <div className="product flex items-center col-span-3 lg:col-span-2 gap-2">
        <img
          src={`${backendDomain}/${product.avatar}`}
          alt={product?._id}
          className="w-10 h-10 lg:w-16 lg:h-16 object-cover"
        />
        <div className="detail">
          <h1 className="capitalize font-normal text-[11px] lg:text-base line-clamp-2 lg:line-clamp-1">
            {product?.name}
          </h1>
          <span className="inline-block lg:hidden font-normal text-[11px]">
            {product?.saleprice !== 0
              ? product?.saleprice?.toLocaleString()
              : product?.price?.toLocaleString()}
            đ
          </span>
        </div>
      </div>

      {/* Price and Quantity */}
      <div className="col-span-1 lg:col-span-2 flex flex-col lg:flex-row justify-around">
        <div className="hidden lg:block price items-center text-[11px] lg:text-base">
          <span className="block">
            {product?.saleprice !== 0
              ? product?.saleprice?.toLocaleString()
              : product?.price?.toLocaleString()}{" "}
            đ
          </span>
          {product?.saleprice !== 0 &&
            product?.price &&
           product?.saleprice < product?.price && (
              <span className="block text-xs line-through text-gray-400">
                {product?.price?.toLocaleString()} đ
              </span>
            )}
        </div>
        <div className="quantity flex flex-col items-center">
          <input
            className="outline-none border lg:p-2 w-10 lg:w-20 rounded-md text-[11px] lg:text-base text-center"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            max={999}
            min={1}
            step={1}
          />
        </div>
      </div>

      <div className="subtotal flex items-center text-[11px] lg:text-base">
        {subtotal?.toLocaleString()} đ
      </div>

      <RiDeleteBack2Line
        className="absolute cursor-pointer top-4 right-0 transform -translate-y-1/2 block group-[hover:block]:"
        size={20}
        color="red"
        onClick={handleRemoveItem}
      />
    </div>
  );
};
