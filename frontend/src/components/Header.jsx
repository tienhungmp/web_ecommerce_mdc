import { useState, useEffect, useRef, useCallback, useContext } from "react";
import logo from "../assets/images/Ondia.png";
import { CiHeart, CiLogin, CiLogout, CiSearch, CiUser } from "react-icons/ci";
import { BsCart3, BsPersonCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  AiOutlineMenuUnfold,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineShopping,
} from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { SummaryApi } from "../common";
import axios from "axios";
import Context from "../context";
import Search from "./Search";

function Header() {
  const user = useSelector((state) => state?.user?.user?.user);
  const { cart } = useContext(Context);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSearch = useCallback(() => setIsSearchOpen((prev) => !prev), []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    []
  );

  const handleLogout = async () => {
    try {
      await axios({
        url: SummaryApi.logout.url,
        method: SummaryApi.logout.method,
        withCredentials: true,
        credentials: "include",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      name: "Quản lí tài khoản",
      icon: <AiOutlineUser size={23} />,
      url: "/myaccount/" + user?.userId,
    },
    {
      name: "Đơn hàng",
      icon: <AiOutlineShopping size={23} />,
      url: "/myaccount/orders",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    if (cart?.products) {
      const updatedTotalQuantity = cart.products.reduce((total, product) => {
        return total + product.quantity;
      }, 0);
      setTotalQuantity(updatedTotalQuantity);
    }
  }, [cart]);

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "capitalize text-primary cursor-pointer my-1 border-b border-primary"
      : "capitalize text-black cursor-pointer my-1 hover:text-primary";

  return (
    <div>
      <div className="sub-header bg-primary text-white text-center text-[12px] py-2">
        <span>
          Mua ngay và tiết kiệm lớn - Miễn phí giao hàng cho tất cả các đơn hàng
        </span>
        <Link to={"/shop"} className="font-semibold mx-3 underline">
          Cửa hàng
        </Link>
      </div>
      <div className="w-full border">
        <div className="main-header flex justify-between max-w-screen-xl mx-4 lg:mx-auto p-2 gap-3">
          <div className="logo w-1/4 flex items-center">
            <NavLink to="/">
              <img
                src={logo}
                alt="Ondia Logo"
                className="h-10 lg:h-16 w-auto"
              />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center justify-start gap-10 w-1/2">
            {["/", "/shop", "/contact", "/about"].map((path, index) => {
              const labels = ["Trang chủ", "Cửa hàng", "Liên hệ", "Chúng tôi"];
              return (
                <li key={index}>
                  <NavLink to={path} className={getNavLinkClass}>
                    {labels[index]}
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-full bg-white z-40 transition-transform transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden`}
          >
            <div className="flex justify-between p-4 border-b">
              <img src={logo} alt="Ondia Logo" className="h-10" />
              <AiOutlineClose size={25} onClick={toggleMenu} />
            </div>
            <ul className="flex flex-col items-center gap-4 mt-6">
              {["/", "/contact", "/about", "/signup"].map((path, index) => {
                const labels = [
                  "Trang chủ",
                  "Liên hệ",
                  "Chúng tôi",
                  "Đăng xuất",
                ];
                return (
                  <li key={index}>
                    <NavLink
                      to={path}
                      className={getNavLinkClass}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {labels[index]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="navbar w-3/4 lg:w-1/2 flex items-center justify-end gap-8 relative">
            {/* Search Bar for small screens */}
            <div
              ref={searchRef}
              className={`${
                isSearchOpen ? "flex" : "hidden"
              } absolute lg:hidden top-12 left-0 w-full bg-gray-300 rounded items-center z-50`}
            >
              <Search/>
            </div>

            {/* Search Bar for large screens */}
            <div className="hidden lg:flex">
              <Search />
            </div>

            <AiOutlineMenuUnfold
              className="block lg:hidden cursor-pointer"
              size={25}
              onClick={toggleMenu}
            />
            <CiSearch
              className="block lg:hidden cursor-pointer"
              size={25}
              onClick={toggleSearch}
            />

            {/* Wishlist and Cart Links */}
            {/* <NavLink to="/wishlist" className={getNavLinkClass}>
              <CiHeart className="hover:text-primary" size={25} />
            </NavLink> */}
            <NavLink to="/cart" className={getNavLinkClass}>
              <div className="relative">
                <BsCart3 className="hover:text-primary" size={25} />
                {cart?.products?.length > 0 && (
                  <span className="absolute -top-4 left-1 bg-primary text-white text-[10px] rounded-full px-1.5 py-0.5">
                    {totalQuantity}
                  </span>
                )}
              </div>
            </NavLink>

            {/* User Icon with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <span
                className={`flex items-center gap-2 cursor-pointer hover:text-primary ${
                  isDropdownOpen ? "text-primary" : ""
                }`}
                onClick={toggleDropdown}
              >
                <BsPersonCircle size={25} />
                <span className="hidden lg:inline-block text-sm">
                  {user?.name ? `Hello, ${user.name}` : ""}
                </span>
              </span>

              {isDropdownOpen && (
                <div className="absolute right-0 bg-[rgba(97,91,97,0.8)] border border-gray-200 shadow-lg rounded mt-2 z-50 min-w-max">
                  {user?.userId ? (
                    <ul className="flex flex-col p-2 text-white text-[14px] lg:text-[15px]">
                      {items.map((item) => (
                        <li
                          key={item.name}
                          className="py-1 px-3 capitalize hover:text-primary cursor-pointer flex items-center gap-3"
                        >
                          {item.icon}
                          <NavLink
                            to={item.url}
                            onClick={() => setIsDropdownOpen(false)}
                            className={({ isActive }) =>
                              isActive ? "text-primary" : "text-white"
                            }
                          >
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                      <li className="py-1 px-3 capitalize hover:text-primary cursor-pointer flex items-center gap-3">
                        <CiLogout size={23} />
                        <NavLink onClick={handleLogout}>Đăng xuất</NavLink>
                      </li>
                    </ul>
                  ) : (
                    <ul className="flex flex-col p-2 text-white text-[14px] lg:text-[15px]">
                      <li className="py-1 px-3 hover:text-primary cursor-pointer flex items-center gap-3">
                        <CiLogin size={23} />
                        <NavLink
                          to="/login"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            isActive ? "text-primary" : "text-white"
                          }
                        >
                          Đăng nhập
                        </NavLink>
                      </li>
                      <li className="py-1 px-3 hover:text-primary cursor-pointer flex items-center gap-3">
                        <CiUser size={23} />
                        <NavLink
                          to="/register"
                          onClick={() => setIsDropdownOpen(false)}
                          className={({ isActive }) =>
                            isActive ? "text-primary" : "text-white"
                          }
                        >
                          Đăng kí
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
