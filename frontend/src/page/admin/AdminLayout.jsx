import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useFetchCurrentUser } from "../../utils/useFetchCurrentUser";
import LoadingPage from "../../components/loading/LoadingPage";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { loading, userData } = useFetchCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!userData || userData.user.role !== "admin") {
      navigate("/");
    }
  }, [userData, loading, navigate]);
  if (loading || !userData) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
