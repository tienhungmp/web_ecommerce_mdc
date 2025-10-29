import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { BsFillCartXFill } from "react-icons/bs";
import { Cardshopping } from "../../components/cart/Cardshopping";
import Context from "../../context";
import { SummaryApi } from "../../common";
import LoadingPage from "../../components/loading/LoadingPage";
import OrderSummary from "./OrderSummary";
import { PiShoppingCartThin } from "react-icons/pi";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

function Cart() {
  const { cart, setCart, userData } = useContext(Context);
  const [cartState, setCartState] = useState({
    isUpdated: false,
    updatedProducts: [],
  });
  const [loading, setLoading] = useState(false);
  const cartKey = "cart"; // Tên key để lưu giỏ hàng trong localStorage

  const getCartProduct = async () => {
    if (!userData) {
      const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart({ products: localCart });
      return;
    }

    try {
      const { data } = await axios({
        url: SummaryApi.getCart.url,
        method: SummaryApi.getCart.method,
        withCredentials: true,
      });
      setCart(data.cart);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);

  const handleQuantityChange = useCallback(
    (productId, newQuantity) => {
      console.log("product", productId);

      setCartState((prev) => {
        const updated = prev.updatedProducts.filter(
          (item) => item.productId !== productId
        );
        updated.push({ productId, quantity: newQuantity });
        return { ...prev, isUpdated: true, updatedProducts: updated };
      });

      if (!userData) {
        // Lấy giỏ hàng từ localStorage
        const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Cập nhật số lượng sản phẩm
        const updatedCart = localCart.map((product) =>
          product.productId === productId
            ? { ...product, quantity: newQuantity }
            : product
        );

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCart({ products: updatedCart }); // Cập nhật lại giỏ hàng trong state
      }
    },
    [cart, userData]
  );

  const handleRemoveProduct = useCallback(
    async (id) => {
      if (!userData) {
        const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const updatedCart = localCart.filter(
          (product) => product.productId !== id
        );
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCart({ products: updatedCart });
        toast.success("Product removed from cart!");
        return;
      }

      try {
        await axios({
          url: SummaryApi.removeFromCart.url,
          method: SummaryApi.removeFromCart.method,
          data: { productId: id },
          withCredentials: true,
        });
        toast.success("Product removed from cart!");
        getCartProduct();
      } catch (error) {
        console.error("Error removing product:", error);
        toast.error("Failed to remove product!");
      }
    },
    [cart, userData]
  );

  const handleUpdateCart = async () => {
    if (cartState.isUpdated && cartState.updatedProducts.length > 0) {
      if (!userData) {
        // Lấy giỏ hàng từ localStorage
        const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];

        // Cập nhật số lượng dựa trên cartState
        const updatedCart = localCart.map((product) => {
          const updatedProduct = cartState.updatedProducts.find(
            (p) => p.productId === product.productId
          );
          return updatedProduct
            ? { ...product, quantity: updatedProduct.quantity }
            : product;
        });

        // Lưu lại giỏ hàng vào localStorage
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCart({ products: updatedCart }); // Cập nhật lại giỏ hàng trong state

        // Reset cartState
        setCartState({ isUpdated: false, updatedProducts: [] });
        toast.success("Cart updated successfully!");
        return;
      }

      try {
        await axios({
          url: SummaryApi.updateCart.url,
          method: SummaryApi.updateCart.method,
          data: { products: cartState.updatedProducts },
          withCredentials: true,
        });
        toast.success("Cart updated successfully!");
        setCartState({ isUpdated: false, updatedProducts: [] });
        getCartProduct();
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("Failed to update cart!");
      }
    }
  };

  const ClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;
    setLoading(true);

    if (!userData) {
      localStorage.removeItem(cartKey);
      setCart({ products: [] });
      setLoading(false);
      toast.success("Cart cleared successfully!");
      return;
    }

    try {
      await axios({
        url: SummaryApi.clearCart.url,
        method: SummaryApi.clearCart.method,
        withCredentials: true,
      });
      setCart([]);
      setCartState({ isUpdated: false, updatedProducts: [] });
      toast.success("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-screen-xl mx-auto bg-white p-4 min-h-[80vh]">
      <p>
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        / <span>Cart</span>
      </p>
      {!cart?.products?.length ? (
        <div className="gap-3 mt-8 text-2xl flex flex-col justify-center items-center">
          <p className="flex justify-center gap-2 items-center text-sm">
            <PiShoppingCartThin size={30} /> Chưa có sản phẩm nào trong giỏ
            hàng.
          </p>
          <Link
            to="/shop"
            type="button"
            className="text-center text-xs lg:text-sm flex items-center gap-3 px-3 py-1 lg:px-4 lg:py-2 font-semibold bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
          >
            <IoReturnUpBack size={20} />
            Quay lại cửa hàng
          </Link>
        </div>
      ) : (
        <div>
          <div className="m-4 flex justify-end">
            <button
              onClick={ClearCart}
              type="button"
              className="text-xs lg:text-sm flex items-center gap-3 px-3 py-1 lg:px-4 lg:py-2 font-semibold bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
            >
              <BsFillCartXFill size={20} />
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2 lg:gap-8 mt-4 px-4 py-6 shadow-md text-xs lg:text-base">
            <h1 className="col-span-3 lg:col-span-2 font-normal">Sản phẩm</h1>
            <div className="col-span-1 lg:col-span-2 flex flex-row justify-around">
              <h1 className="hidden lg:block font-normal">Giá</h1>
              <h1 className="font-normal">Số lượng</h1>
            </div>
            <h1 className="font-normal">Tạm tính</h1>
          </div>

          {cart?.products?.map((item) => (
            <Cardshopping
              key={item?.productId}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveProduct}
            />
          ))}
          <OrderSummary cart={cart} />

          <div className="flex justify-between gap-8 my-8">
            <Link
              to="/shop"
              type="button"
              className="text-xs lg:text-sm flex items-center gap-3 px-3 py-1 lg:px-4 lg:py-2 font-semibold bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
            >
              <IoReturnUpBack size={20} />
              Trở lại cửa hàng
            </Link>
            <div className="flex gap-4">
              <button
                type="button"
                className={`text-xs lg:text-sm flex items-center gap-3 px-3 py-1 lg:px-4 lg:py-2 font-semibold bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md ${
                  !cartState.isUpdated ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handleUpdateCart}
                disabled={!cartState.isUpdated}
              >
                <RxUpdate size={20} />
                Cập nhật
              </button>
              <Link
                to="checkout"
                type="button"
                className="text-xs lg:text-sm flex items-center gap-3 px-3 py-1 lg:px-4 lg:py-2 font-semibold bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
              >
                Thanh toán
                <MdOutlineShoppingCartCheckout size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
