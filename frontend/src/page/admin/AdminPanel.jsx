import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ROLE from "../../common/role"; // Lưu ý rằng ROLE.ADMIN là giá trị string (ví dụ: "admin")

function AdminPanel() {
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate(); // Điều hướng

  // useEffect(() => {
  //   if (!user) {
  //     // Nếu không có dữ liệu người dùng, chuyển hướng về trang login
  //     navigate("/login");
  //   } else if (user?.role !== ROLE.ADMIN) {
  //     // Nếu người dùng không phải là admin, chuyển hướng về trang khác (home hoặc login)
  //     navigate("/"); // Bạn có thể thay thế đường dẫn khác nếu cần
  //   }
  // }, [user, navigate]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Admin Panel</h1>

          {/* Các phần khác của Admin */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <div className="bg-gray-100 p-4 rounded-md">
              <p>List of all users goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
