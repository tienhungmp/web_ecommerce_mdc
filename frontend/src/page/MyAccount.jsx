import { Link, Outlet, NavLink } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { CiHeart, CiLogout, CiViewList } from "react-icons/ci";
import { useSelector } from "react-redux";
import { MdManageAccounts } from "react-icons/md";
import ROLE from "../common/role";

function MyAccount() {
  const user = useSelector((state) => state?.user?.user?.user);
  console.log('user',user);
  
  return (
    <div className="max-w-screen-xl mx-auto lg:px-0 pb-8">
      {/* Breadcrumb */}
      <div className="flex justify-between items-center my-10 px-2">
        <p>
          <Link to="/" className="text-gray-500 hover:underline">
            Home
          </Link>
          / <span>My Account</span>
        </p>
        <p>
          Welcome, <span className="text-primary">{user?.name}</span>
        </p>
      </div>

      {/* Main layout */}
      <div className="relative grid grid-cols-8 lg:grid-cols-5 gap-1">
        {/* Sidebar Navigation */}
        <nav className="space-y-6 col-span-1 shadow-lg">
          <ul className="space-y-6 text-gray-500">
            <li>
              <NavLink
                 to={`/myaccount/${user?.userId}`}
                end
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                    isActive ? "text-primary border-b border-b-primary" : ""
                  }`
                }
              >
                <BsPersonCircle size={25} />
                <span className="hidden lg:inline-block">Hồ sơ</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myaccount/orders"
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                    isActive ? "text-primary border-b border-b-primary" : ""
                  }`
                }
              >
                <CiViewList size={25} />
                <span className="hidden lg:inline-block">Đơn hàng</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/myaccount/wishlist"
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                    isActive ? "text-primary border-b border-b-primary" : ""
                  }`
                }
              >
                <CiHeart size={25} />
                <span className="hidden lg:inline-block">My Wishlist</span>
              </NavLink>
            </li> */}
           {
            user?.role === ROLE.ADMIN && ( <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary ${
                    isActive ? "text-primary border-b border-b-primary" : ""
                  }`
                }
              >
                <MdManageAccounts size={25} />
                <span className="hidden lg:inline-block">Quản lý admin</span>
              </NavLink>
            </li>)
           }
            <li
              className="flex items-center justify-center lg:justify-start gap-2 px-1 lg:px-6 py-2 cursor-pointer hover:text-primary"
              onClick={() => {
                localStorage.removeItem("authToken"); // Xóa token đăng nhập
                window.location.href = "/login"; // Redirect đến trang đăng nhập
              }}
            >
              <CiLogout size={23} />
              <span className="hidden lg:inline-block">Đăng xuất</span>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <div className="col-span-7 lg:col-span-4">
          <Outlet /> {/* Render nội dung từ các route con */}
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
