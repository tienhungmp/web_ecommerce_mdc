import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import BillingDetails from "../components/checkout/BillingDetails";
import YourOrder from "../components/checkout/YourOrder";
import Context from "../context";
import LoadingPage from "../components/loading/LoadingPage";
import { toast } from "react-toastify";
import CouponForm from "./Cart/CouponForm";
import { SummaryApi } from "../common";

function Checkout() {
  const { userData } = useContext(Context);
  const { setCart, cart } = useContext(Context);

  const { slug } = useParams();
  console.log("productDetails", slug);
  // Lấy slug từ URL
  const [searchParams] = useSearchParams();
  const quantity = searchParams.get("quantity") || 1;
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("bank");

  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [billingData, setBillingData] = useState({});
  const [coupon, setCoupon] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Lưu giá trị totalPrice từ component con

  const handleTotalPriceChange = (newTotal) => {
    setTotalPrice(newTotal);
  };

  const userDetails = useSelector((state) => state?.user?.user?.user);

  // Fetch user data
  const fetchUser = async (id) => {
    try {
      const url = SummaryApi.getUser.url.replace(":id", id);
      const { data } = await axios({
        url,
        method: SummaryApi.getUser.method,
        withCredentials: true,
      });
      setUser(data.user);
    } catch (error) {
      console.error("Failed to load user data:", error);
      toast.error("Không thể tải thông tin người dùng.");
    }
  };
  const cartKey = "cart";
  // Fetch cart products
  const fetchCartProducts = async () => {
    if (!userData) {
      const localCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart({ products: localCart });
      setOrders(localCart);
      console.log("cart", cart);

      return;
    }
    try {
      const { data } = await axios({
        url: SummaryApi.getCart.url,
        method: SummaryApi.getCart.method,
        withCredentials: true,
      });
      setOrders(data.cart.products);
    } catch (error) {
      console.error("Error fetching cart products:", error);
      toast.error("Không thể tải giỏ hàng. Vui lòng thử lại.");
    }
  };

  // Fetch single product by ID
  // const fetchProductById = async (productId) => {
  //   try {
  //     const url = SummaryApi.getProductById.url.replace(":id", productId);
  //     const { data } = await axios({
  //       url,
  //       method: SummaryApi.getProductById.method,
  //       withCredentials: true,
  //     });
  //     setOrders([
  //       {
  //         product: data.product,
  //         quantity: state.quantity,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error fetching product by ID:", error);
  //     toast.error("Không thể tải thông tin sản phẩm.");
  //   }
  // };

  // Fetch single product by slug
  const fetchProductBySlug = async (slug) => {
    try {
      const url = SummaryApi.getProductsBySlug.url.replace(":slug", slug);
      console.log("url", url);

      const { data } = await axios({
        url,
        method: SummaryApi.getProductsBySlug.method,
        withCredentials: true,
      });
      setOrders([
        {
          product: data.product,
          quantity: parseInt(quantity, 10),
        },
      ]);
    } catch (error) {
      console.error("Error fetching product by slug:", error);
      toast.error("Không thể tải thông tin sản phẩm.");
    }
  };

  // Validate billing inputs
  const validateInputs = () => {
    const errors = {};
    if (!billingData?.name) errors.name = "Tên là bắt buộc.";
    if (!billingData?.address) errors.address = "Địa chỉ là bắt buộc.";
    if (!billingData?.phone) {
      errors.phone = "Số điện thoại là bắt buộc.";
    } else if (!/^[0-9]{10}$/.test(billingData.phone)) {
      errors.phone = "Số điện thoại sai định dạng.";
    }
    if (!billingData?.email) {
      errors.email = "Email là bắt buộc.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingData.email)) {
      errors.email = "Email sai định dạng.";
    }
    return errors;
  };

  // Handle checkout
  const handleCheckout = async () => {
    setLoading(true);

    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    let formattedProducts = [];
    const bhv = searchParams.get("bhv"); // Lấy tham số bhv từ URL

    const additionalPrice = bhv === "true" ? 1000000 : 0; // Nếu bhv=true, thêm 1 triệu vào giá sản phẩm
    const warrantyIds = searchParams.get("mbh");
    if (!userData) {
      formattedProducts = orders.map((order) => {
        let price =
          order?.product?.saleprice !== 0
            ? order?.product?.saleprice
            : order?.product?.price;
        price += additionalPrice; // Thêm tiền vào giá nếu bhv=true

        return {
          product: order?.product?._id,
          quantity: order?.quantity,
          price: price,
          variant: order?.variant?._id,
          warrantyIds: warrantyIds || order.warrantyIds,
        };
      });
    } else {
      formattedProducts = orders.map((order) => {
        let price =
          order?.product?.saleprice !== 0
            ? order?.product?.saleprice
            : order?.product?.price;
        price += additionalPrice; // Thêm tiền vào giá nếu bhv=true

        return {
          product: order?.product?._id,
          quantity: order?.quantity,
          price: price,
          variant: order?.variant?._id,
           warrantyIds: warrantyIds || order.warrantyIds,
        };
      });
    }

    const checkoutData = {
      products: formattedProducts,
      shippingAddress: billingData?.address,
      phone: billingData?.phone,
      email: billingData?.email,
      discount: coupon?.value || 0,
      paymentMethod: selectedOption,
    };

    try {
      const apiUrl = userData
        ? SummaryApi.createOrder.url
        : SummaryApi.createOrderGuest.url;

      const response = await axios({
        url: apiUrl,
        method: SummaryApi.createOrder.method,
        data: checkoutData,
        withCredentials: true,
      });


      if (userData) {
        if (!state?.id) {
          await axios({
            url: SummaryApi.clearCart.url,
            method: SummaryApi.clearCart.method,
            withCredentials: true,
          });
          setCart([]);
        }
      } else {
        localStorage.removeItem("cart");
        setCart([]);
      }

      if (selectedOption === 'vnpay') {
        try {
          const responseVnpay = await axios({
            url: SummaryApi.paymentVnpay.url,
            method: SummaryApi.paymentVnpay.method,
            data: {
              orderId: response?.data?.order?._id,
              totalPrice: totalPrice,
            },
            withCredentials: true,
          });
          
          setLoading(false);
          window.location.href = responseVnpay?.data?.paymentUrl;
        } catch (error) {
          setLoading(false);
          console.error("Error during checkout:", error);
          toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
        }

      } else {
        toast.success("Đặt hàng thành công!");
        setTimeout(() => {
          setLoading(false);
          navigate(`/cart/checkout/order-received/${response?.data?.order?._id}`);
        }, 800);
      }

    } catch (error) {
      setLoading(false);
      console.error("Error during checkout:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (userDetails?.userId) {
      fetchUser(userDetails.userId);
    }
  }, [userDetails?.userId]);

  useEffect(() => {
    if (slug) {
      fetchProductBySlug(slug);
    } else {
      fetchCartProducts();
    }
  }, [slug]);

  const getDiscountByName = async (name) => {
    try {
      const response = await axios({
        url: SummaryApi.getDiscountByName.url,
        method: SummaryApi.getDiscountByName.method,
        data: { name },
        withCredentials: true,
      });
      setCoupon(response.data.discount);
    } catch (error) {
      console.error(
        "Error fetching discount:",
        error.response?.data?.message || error.message
      );
      toast.error("Không thể áp dụng mã giảm giá.");
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Home
        </Link>
        /
        <Link to="/cart" className="text-gray-500 hover:underline">
          Cart
        </Link>
        /<span>Checkout</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-10 gap-20">
        <div>
          <BillingDetails
            user={user}
            setBillingData={setBillingData}
            errors={errors}
          />
          <CouponForm getDiscountByName={getDiscountByName} />
        </div>
        <div>
          <YourOrder
            orders={orders}
            coupon={coupon}
            onTotalChange={handleTotalPriceChange}
          />
          <div className="space-y-6 py-4 shadow-md bg-slate-100 px-4">
            <div>
              <h2 className="font-bold">Chọn phương thức thanh toán</h2>
              <div className="mt-6">
                <div className="flex items-center">
                  <label
                    className="relative flex items-center cursor-pointer"
                    htmlFor="bank"
                  >
                    <input
                      name="checkout"
                      type="radio"
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                      id="bank"
                      checked={selectedOption === "bank"}
                      onChange={() => setSelectedOption("bank")}
                    />
                    <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </label>
                  <label
                    className="ml-2 text-slate-600 cursor-pointer text-sm"
                    htmlFor="bank"
                  >
                    Chuyển khoản ngân hàng
                  </label>
                </div>

                {/* Chỉ hiển thị khi chọn bank */}
                {selectedOption === "bank" && (
                  <div className="mt-4 p-4 border border-slate-300 rounded-md bg-slate-50">
                    <p className="text-sm leading-6">
                      Thực hiện thanh toán vào tài khoản ngân hàng của chúng
                      tôi.
                      <br />
                      <strong>Đơn vị thụ hưởng:</strong> SMART HOME VIET NAM CO
                      LTD
                      <br />
                      <strong>Ngân hàng:</strong> VP Bank chi nhánh Bắc Giang
                      <br />
                      <strong>Số tài khoản:</strong> 678898988
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center mt-6">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="cod"
                >
                  <input
                    name="checkout"
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                    id="cod"
                    checked={selectedOption === "cod"}
                    onChange={() => setSelectedOption("cod")}
                  />
                  <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label
                  className="ml-2 text-slate-600 cursor-pointer text-sm"
                  htmlFor="cod"
                >
                  Thanh toán khi nhận hàng
                </label>
              </div>

              <div className="flex items-center mt-6">
                <label
                  className="relative flex items-center cursor-pointer"
                  htmlFor="vnpay"
                >
                  <input
                    name="checkout"
                    type="radio"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                    id="vnpay"
                    checked={selectedOption === "vnpay"}
                    onChange={() => setSelectedOption("vnpay")}
                  />
                  <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </label>
                <label
                  className="ml-2 text-slate-600 cursor-pointer text-sm"
                  htmlFor="vnpay"
                >
                  Thanh toán qua VNPay
                </label>
              </div>
            </div>
            <h2 className="font-bold">Trả góp</h2>
            <div className="flex items-center mt-2 px-4">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="gop6"
              >
                <input
                  name="checkout"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="gop6"
                  checked={selectedOption === "gop6"}
                  onChange={() => setSelectedOption("gop6")}
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="gop6"
              >
                Trả góp 6 tháng{" "}
                {totalPrice
                  ? `(Mỗi tháng phải trả ${(
                      totalPrice * 0.2
                    ).toLocaleString()} đ)`
                  : ""}
              </label>
            </div>
            <div className="flex items-center mt-6 px-4">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="gop9"
              >
                <input
                  name="checkout"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="gop9"
                  checked={selectedOption === "gop9"}
                  onChange={() => setSelectedOption("gop9")}
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="gop9"
              >
                Trả góp 9 tháng{" "}
                {totalPrice
                  ? `(Mỗi tháng phải trả ${(
                      totalPrice * 0.14
                    ).toLocaleString()} đ)`
                  : ""}
              </label>
            </div>
            <div className="flex items-center mt-6 px-4">
              <label
                className="relative flex items-center cursor-pointer"
                htmlFor="gop12"
              >
                <input
                  name="checkout"
                  type="radio"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                  id="gop12"
                  checked={selectedOption === "gop12"}
                  onChange={() => setSelectedOption("gop12")}
                />
                <span className="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
              </label>
              <label
                className="ml-2 text-slate-600 cursor-pointer text-sm"
                htmlFor="gop12"
              >
                Trả góp 12 tháng{" "}
                {totalPrice
                  ? `(Mỗi tháng phải trả ${(
                      totalPrice * 0.112
                    ).toLocaleString()} đ)`
                  : ""}
              </label>
            </div>

            <button
              type="button"
              className={`text-sm px-4 py-2.5 w-full font-semibold tracking-wide border rounded-md transition 
                ${
                  loading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white"
                }`}
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
