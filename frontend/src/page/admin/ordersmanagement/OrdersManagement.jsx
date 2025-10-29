import React, { useEffect, useState } from "react";
import axios from "axios";
import { SummaryApi } from "../../../common";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import ViewOrder from "../../../components/layouts/ViewOrder";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditing, setIsEditing] = useState(null); // Track edit mode for each order
  const [editedStatus, setEditedStatus] = useState("");
  const getPaymentMethodText = (paymentMethod,totalPrice) => {
    switch (paymentMethod) {
      case 'cod':
        return 'Thanh toán khi nhận hàng';
      case 'bank':
        return 'Chuyển khoản ngân hàng';
      case 'gop6':
        return `Trả góp 6 tháng (mỗi tháng phải trả ${(totalPrice*0.2).toLocaleString()})`;
      case 'gop9':
        return `Trả góp 9 tháng (mỗi tháng phải trả ${(totalPrice*0.14).toLocaleString()})`;
      case 'gop12':
        return `Trả góp 12 tháng (mỗi tháng phải trả ${(totalPrice*0.112).toLocaleString()})`;
      default:
        return 'Phương thức thanh toán không xác định';
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios({
        url: SummaryApi.getAllOrders.url,
        method: SummaryApi.getAllOrders.method,
        withCredentials: true,
        params: { phone: searchTerm, page: currentPage, limit: 10 },
      });
      setOrders(data.orders);
      setFilteredOrders(data.orders);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          (statusFilter === "All" || order.orderStatus === statusFilter) &&
          (!searchTerm ||
            order.phone.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [orders, statusFilter, searchTerm]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      const { data } = await axios({
        url: SummaryApi.deleteOrderById.url.replace(":id", id),
        method: SummaryApi.deleteOrderById.method,
        withCredentials: true,
      });
      const updatedOrders = orders.filter((order) => order._id !== id);
      setOrders(updatedOrders);
      setFilteredOrders(updatedOrders);
      setTotalPages(data.total_pages);
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete the order.");
    }
  };

  const handleEdit = (order) => {
    setIsEditing(order._id); // Set the editing order ID
    setEditedStatus(order.orderStatus); // Pre-fill the status for editing
  };

  const handleSave = async (id) => {
    if (!editedStatus) {
      console.warn("Edited status is required");
      return;
    }
  
    let paymentStt = "Pending";
  
    // Xác định paymentStatus dựa trên orderStatus
    switch (editedStatus) {
      case "Pending":
        paymentStt = "Pending";
        break;
      case "Processing":
        paymentStt = "Pending";
        break;
      case "Shipped":
        paymentStt = "Paid";
        break;
      case "Delivered":
        paymentStt = "Paid";
        break;
      case "Cancelled":
        paymentStt = "Failed";
        break;
      default:
        console.warn("Invalid order status");
        return;
    }
  
    try {
      // Gửi yêu cầu cập nhật trạng thái đơn hàng
      await axios({
        url: SummaryApi.cancelOrder.url.replace(":id", id),
        method: SummaryApi.cancelOrder.method,
        data: { orderStatus: editedStatus, paymentStatus: paymentStt },
        withCredentials: true,
      });
  
      // Cập nhật trạng thái trong giao diện
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? { ...order, orderStatus: editedStatus, paymentStatus: paymentStt }
            : order
        )
      );
  
      alert("Order status updated successfully!");
      setIsEditing(null)
      window.location.reload()
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };
  

  const Pagination = () => (
    <div className="flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className={`p-1 rounded-full text-sm border ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white"
        }`}
      >
        <HiOutlineArrowSmLeft size={15} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`p-1 rounded-full text-sm w-7 h-7 flex items-center justify-center border cursor-pointer ${
            currentPage === index + 1 ? "bg-primary text-white" : "bg-gray-300"
          }`}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </span>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className={`p-1 rounded-full text-sm border ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white"
        }`}
      >
        <HiOutlineArrowSmRight size={15} />
      </button>
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-3">
      <h2 className="text-xl font-semibold mb-6">Đơn hàng</h2>

      <div className="mb-4 flex gap-4">
        <div>
          <label htmlFor="statusFilter" className="mr-2 text-sm text-gray-700">
            Lọc theo:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-1 px-3 py-1 border rounded outline-none text-sm"
          >
            {[
              "All",
              "Pending",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
            ].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="search" className="mr-2 text-sm text-gray-700">
           Tìm kiếm số điện thoại:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 px-3 py-1 border rounded outline-none text-sm"
            placeholder="Enter phone number"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Mã đơn hàng",
                "Ngày",
                "Địa chỉ",
                "Số điện thoại",
                "Phương thức thanh toán",
                "Tổng đơn hàng",
                "Trạng thái",
                "Hành động",
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-3 text-left text-sm font-medium text-gray-500"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {order._id}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {new Date(order.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {order.shippingAddress}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {order.phone}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {getPaymentMethodText(order.paymentMethod,order.totalPrice)}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {order.totalPrice?.toLocaleString()} VND
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                    {isEditing === order._id ? (
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                        className="px-2 py-1 border rounded"
                      >
                        {[
                          "Pending",
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          {
                            Pending: "bg-gray-100 text-gray-600",
                            Processing: "bg-blue-100 text-blue-600",
                            Shipped: "bg-orange-100 text-orange-600",
                            Delivered: "bg-green-100 text-green-600",
                            Cancelled: "bg-red-100 text-red-600",
                          }[order.orderStatus]
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-3 text-sm text-gray-700">
                  {isEditing === order._id ? (
                      <button
                        className="text-green-500 hover:underline"
                        onClick={() => handleSave(order._id)}
                      >
                        Lưu
                      </button>
                    ) : (
                      <button
                        className="text-yellow-500 hover:underline"
                        onClick={() => handleEdit(order)}
                      >
                        Sửa
                      </button>
                    )}
                    <button
                      className="ml-2 text-blue-500 hover:underline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Xem
                    </button>
                    <button
                      className="ml-2 text-red-500 hover:underline"
                      onClick={() => handleDelete(order._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && <Pagination />}

      {selectedOrder && (
        <ViewOrder
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersManagement;
