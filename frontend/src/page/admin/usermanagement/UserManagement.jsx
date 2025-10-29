import { useState, useEffect } from "react";
import UserManagementTable from "./UserManagementTable";
import axios from "axios";
import { SummaryApi } from "../../../common";
import LoadingPage from "../../../components/loading/LoadingPage";
import { toast } from "react-toastify";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const dataResponse = await axios({
        url:`${SummaryApi.getAllUser.url}?page=${page}&limit=10`,
        method: SummaryApi.getAllUser.method,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data;
      setTotalPages(dataApi.total_pages)
      
      setUsers(dataApi.user);
      console.log("dataApi",dataApi);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch user data.");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      return;
    }

    try {
      const url = SummaryApi.deleteUser.url.replace(":id", user._id);

      await axios({
        url: url,
        method: SummaryApi.deleteUser.method,
        withCredentials: true,
      });

      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
      toast.success(`User ${user.name} has been deleted.`);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(`Failed to delete user: ${user.name}.`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await axios({
        url: SummaryApi.updateUser.url.replace(":id", updatedUser._id),
        method: SummaryApi.updateUser.method,
        headers: {
          "Content-Type": "application/json",
        },
        data: updatedUser,
        withCredentials: true,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? response.data.user : user
        )
      );
      toast.success("User updated successfully.");
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update user.");
    } finally {
      handleCloseModal();
    }
  };

  const Pagination = () => (
    <div className="flex items-center justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`p-1 rounded-full text-sm flex items-center justify-center border ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed text-white"
            : "bg-primary text-white"
        }`}
      >
        <HiOutlineArrowSmLeft size={15} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`p-1 rounded-full text-sm w-7 h-7 flex items-center justify-center border cursor-pointer ${
            page === index + 1 ? "bg-primary text-white" : "bg-gray-300"
          }`}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </span>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        className={`p-1 rounded-full text-sm flex items-center justify-center border ${
          page === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white"
        }`}
      >
        <HiOutlineArrowSmRight size={15} />
      </button>
    </div>
  );

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Quản lí người dùng</h1>
      <UserManagementTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="my-4 flex items-center justify-between">
        <p className="text-primary text-center text-sm">
          {/* Hiển thị từ {startIndex} - {endIndex} trên {totalProducts} sản phẩm */}
        </p>
        <Pagination />
      </div>
    </div>
  );
};

// const EditUserModal = ({ user, onClose, onSave }) => {
//   const [formData, setFormData] = useState(user);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (JSON.stringify(formData) !== JSON.stringify(user)) {
//       onSave(formData);
//     } else {
//       toast.info("No changes detected.");
//     }
//   };

//   return (
//     <div
//       id="modal-overlay"
//       className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//       onClick={(e) => {
//         if (e.target.id === "modal-overlay") {
//           onClose();
//         }
//       }}
//     >
//       <div className="bg-white p-6 rounded shadow-md w-1/2 text-sm">
//         <h2 className="text-xl font-bold mb-4">Edit User</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="flex gap-4">
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name || ""}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email || ""}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2">Phone number</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone || ""}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//             <div className="mb-4 w-full">
//               <label className="block text-gray-700 mb-2">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address || ""}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export default UserManagement;
