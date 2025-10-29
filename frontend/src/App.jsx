import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingPage from "./components/loading/LoadingPage";
import { useFetchCurrentUser } from "./utils/useFetchCurrentUser";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import Context from "./context";
import { useEffect, useState } from "react";
import axios from "axios";
import { SummaryApi } from "./common";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ZaloButton from "./components/ZaloButton";

function App() {
  const { loading, userData } = useFetchCurrentUser();
  const location = useLocation();
  const navigate = useNavigate(); // For navigation
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userData) {
      getCartProduct();
    }
  }, [userData]);

  // Redirect if user is logged in and accesses the login page
  useEffect(() => {
    if (
      userData &&
      Object.keys(userData).length > 0 &&
      location.pathname === "/login"
    ) {
      navigate("/"); // Redirect to home if logged in and on login page
    }
  }, [userData, location.pathname, navigate]);

  const getCartProduct = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getCart.url,
        method: SummaryApi.getCart.method,
        withCredentials: true,
      });
      const dataApi = dataResponse.data;
      setCart(dataApi.cart);
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Context.Provider
        value={{
          cart,
          setCart,
          userData,
          loading,
        }}
      >
        <ToastContainer />
        {!isAdminRoute && <Header />}
        <main>
          <Outlet />
        </main>
        <ScrollToTopButton />
        <ZaloButton />
        {!isAdminRoute && <Footer />}
      </Context.Provider>
    </>
  );
}

export default App;
