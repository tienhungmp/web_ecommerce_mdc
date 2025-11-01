import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdCategory,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { AiOutlineControl, AiOutlineProduct } from "react-icons/ai";
import { FaUsersGear } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
import logo from "../../assets/images/Ondia.png";
import { useSelector } from "react-redux";
import { BiSolidCoupon } from "react-icons/bi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { VscFeedback } from "react-icons/vsc";
import { TfiCommentAlt, TfiWrite } from "react-icons/tfi";
import { IoMdImages } from "react-icons/io";
import axios from "axios";
import { SummaryApi } from "../../common";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

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

  const menuItems = [
    // {
    //   label: "Bảng điều khiển",
    //   icon: <AiOutlineControl size={25} />,
    //   link: "/admin",
    // },
    {
      label: "Quản lý người dùng",
      icon: <FaUsersGear size={25} />,
      link: "/admin/users",
    },
    {
      label: "Đơn hàng",
      icon: <CiShoppingCart size={25} />,
      link: "/admin/orders",
    },
    {
      label: "Quản lý sản phẩm",
      icon: <AiOutlineProduct size={25} />,
      link: "/admin/products",
    },
    {
      label: "Quản lý danh mục",
      icon: <MdCategory size={25} />,
      link: "/admin/categories",
    },
    {
      label: "Mã giảm giá",
      icon: <BiSolidCoupon size={25} />,
      link: "/admin/coupons",
    },
    {
      label: "Bảo hành",
      icon: <HiOutlineWrenchScrewdriver size={25} />,
      link: "/admin/warranty",
    },
    {
      label: "Phản hồi",
      icon: <VscFeedback size={25} />,
      link: "/admin/feedbacks",
    },
    {
      label: "Đánh giá",
      icon: <TfiCommentAlt size={25} />,
      link: "/admin/reviews",
    },
    // {
    //   label: "Bài viết",
    //   icon: <TfiWrite size={25} />,
    //   link: "https://ondia.vn/wp-login.php",
    // },
    {
      label: "Banner",
      icon: <IoMdImages size={25} />,
      link: "/admin/banner",
    }
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-52" : "w-20"
      } h-screen text-white shadow-md transition-all duration-300`}
    >
      <div className="relative flex justify-center">
        <NavLink to="/">
          <img
            src={logo}
            alt="Ondia Logo"
            className={`${sidebarOpen ? "h-14" : "h-10"} my-2 w-auto `}
          />
        </NavLink>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bg-white text-primary p-1 rounded-full border hover:text-white hover:bg-primary mb-4 top-2 -right-3"
        >
          {sidebarOpen ? (
            <MdOutlineKeyboardDoubleArrowLeft size={20} />
          ) : (
            <MdOutlineKeyboardDoubleArrowRight size={20} />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <ul className="my-4 px-2 text-[13px]">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center ${
              sidebarOpen ? "justify-start" : "justify-center"
            } gap-2 py-2 cursor-pointer`}
          >
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-2 w-full py-2 px-4 rounded border-b border-transparent ${
                  isActive
                    ? "text-primary border-b-primary"
                    : "text-gray-500 hover:text-primary hover:border-b-primary"
                }`
              }
            >
              {item.icon}
              <span
                className={`${
                  !sidebarOpen
                    ? "hidden opacity-0 transform scale-75"
                    : "opacity-100 transform scale-100"
                } transition-all duration-300`}
              >
                {item.label}
              </span>
            </NavLink>
          </li>
        ))}
        {/* Logout button */}
        <li
          className={`flex items-center ${
            sidebarOpen ? "justify-start" : "justify-center"
          } gap-2 py-2 cursor-pointer`}
        >
          <NavLink
            onClick={handleLogout}
            className="flex items-center gap-2 w-full py-2 px-4 rounded border-b border-transparent text-gray-500 hover:text-primary hover:border-b-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span
              className={`${
                !sidebarOpen
                  ? "hidden opacity-0 transform scale-75"
                  : "opacity-100 transform scale-100"
              } transition-all duration-300`}
            >
              Đăng xuất
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
