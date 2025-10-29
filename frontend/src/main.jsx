import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; // Layout chính cho người dùng
import Home from "./page/Home.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Wishlist from "./page/Wishlist.jsx";
import Cart from "./page/Cart/Cart.jsx";
import Shop from "./page/Shop.jsx";
import Checkout from "./page/Checkout.jsx";
import MyAccount from "./page/MyAccount.jsx";
import About from "./page/About.jsx";
import Contact from "./page/Contact.jsx";
import NotFound from "./page/NotFound.jsx";
import ProductPage from "./page/ProductPage.jsx";
import Policy from "./page/Policy/Policy.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminLayout from "./page/admin/AdminLayout.jsx";
import AdminPanel from "./page/admin/AdminPanel.jsx";
import UserManagement from "./page/admin/usermanagement/UserManagement.jsx";
import ProductManagement from "./page/admin/productmanagement/ProductManagement.jsx";
import Editprofile from "./components/layouts/editprofile.jsx";
import Myorder from "./components/layouts/Myorder.jsx";
import CategoriesManagement from "./page/admin/categoriesmanagement/CategoriesManagement.jsx";
import EditProduct from "./page/admin/productmanagement/EditProduct.jsx";
import EditCategory from "./page/admin/categoriesmanagement/EditCategory.jsx";
import OrderReceived from "./components/checkout/OrderReceived.jsx";
import OrdersManagement from "./page/admin/ordersmanagement/OrdersManagement.jsx";
import CouponsManagement from "./page/admin/couponmanagement/CouponsManagement.jsx";
import EditCoupon from "./page/admin/couponmanagement/EditCoupon.jsx";
import WarrantyManagement from "./page/admin/warrantymanagement/WarrantyManagement.jsx";
import FeedBackManagement from "./page/admin/feedback/feedBackManagement.jsx";
import ReviewManagement from "./page/admin/review/ReviewManagement.jsx";
import ForgotPassword from "./page/ForgotPassword.jsx";
import ResetPassword from "./page/ResetPassword.jsx";
import ShippingPolicy from "./page/Policy/ShippingPolicy.jsx";
import Guide from "./page/Policy/Guide.jsx";
import PaymentMethods from "./page/Policy/PaymentMethods.jsx";
import ShippingAndDelivery from "./page/Policy/ShippingAndDelivery.jsx";
import BannerManagement from "./page/admin/banner/BannerManagement.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Layout chính
    children: [
      { path: "/", element: <Home /> },
      { path: "/shop", element: <Shop/> },
      { path: "/shop/:id", element: <Shop/> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/cart", element: <Cart /> },
      { path: "/cart/checkout", element: <Checkout /> },
      { path: "/products/checkout/:slug", element: <Checkout /> },
      { path: "/cart", element: <Cart /> },
      { path: "cart/checkout/order-received/:id", element: <OrderReceived /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products/:productDetails", element: <ProductPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/forgot-password/:id", element: <ResetPassword /> },
      
      { path: "/policy", element: <Policy /> },
      { path: "/chinh-sach-giao-hang", element: <ShippingPolicy /> },
      { path: "/huong-dan-mua-hang-online", element: <Guide /> },
      { path: "/cac-phuong-thuc-thanh-toan", element: <PaymentMethods /> },
      { path: "/van-chuyen-va-giao-nhan", element: <ShippingAndDelivery /> },


      
      {
        path: "/myaccount",
        element: <MyAccount />,
        children: [
          { path: ":id", element: <Editprofile /> },
          { path: "orders", element: <Myorder /> },
          { path: "wishlist", element: <Wishlist /> },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <AdminPanel /> },
      { path: "users", element: <UserManagement /> },
      { path: "coupons", element: <CouponsManagement /> },
      { path: "coupons/:id", element: <EditCoupon /> },
      { path: "orders", element: <OrdersManagement /> },
      { path: "products", element: <ProductManagement /> },
      { path: "products/:id", element: <EditProduct /> },
      { path: "categories", element: <CategoriesManagement />},
      { path: "categories/:id", element: <EditCategory />},
      { path: "warranty", element: <WarrantyManagement />},
      { path: "feedbacks", element: <FeedBackManagement />},
      { path: "reviews", element: <ReviewManagement />},
      { path: "banner", element: <BannerManagement />},
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
