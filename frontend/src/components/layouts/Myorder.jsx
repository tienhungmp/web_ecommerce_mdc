import axios from "axios";
import React, { useEffect, useState } from "react";
import { SummaryApi } from "../../common";
import ViewOrder from "./ViewOrder";
import CheckWarrantyCode from "./CheckWarrantyCode";

function Myorder() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");

  const renderOrder = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: SummaryApi.getOrdersByUser.url,
        method: SummaryApi.getOrdersByUser.method,
        withCredentials: true,
      });
      setOrders(response.data.orders);
      // console.log("Order",orders);
      
      setFilteredOrders(response.data.orders); // Initialize filtered orders
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      await axios({
        url: SummaryApi.cancelOrder?.url.replace(":id", id),
        method: SummaryApi.cancelOrder?.method,
        data: { orderStatus: "Cancelled", paymentStatus: "Failed" },
        withCredentials: true,
      });
      // Update the UI after successful cancellation
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order?._id === id ? { ...order, orderStatus: "Cancelled" } : order
        )
      );
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    renderOrder();
  }, []);

  useEffect(() => {
    // Filter orders whenever filterStatus changes
    if (filterStatus === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order?.orderStatus === filterStatus)
      );
    }
  }, [filterStatus, orders]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order); // Set the selected order for the modal
  };

  const closeModal = () => {
    setSelectedOrder(null); // Close the modal by clearing the selected order
  };
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

  return (
    <div className="bg-white shadow-md rounded-lg p-3">
      <h2 className="text-xl font-semibold mb-6">Đơn hàng của bạn</h2>
      <CheckWarrantyCode />
      <hr className="my-8" />
      {/* Filter Dropdown */}
      <h1 className="mb-2 font-medium text-sm">Tất cả đơn hàng của bạn</h1>
      <div className="mb-4 text-right">
        <label htmlFor="statusFilter" className="mr-2 text-sm font-medium">
          Lọc theo trạng thái:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="mt-1 px-3 py-1 w-40 border rounded outline-none"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Id đơn hàng
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Ngày
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Gửi đến
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Điện thoại
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Thanh toán
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Tổng tiền
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Trạng thái
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 whitespace-nowrap">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {order?._id}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700 whitespace-nowrap">
                    {new Date(order?.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {order?.shippingAddress}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {order?.phone}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                  {getPaymentMethodText(order?.paymentMethod,order?.totalPrice)}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {order?.totalPrice
                      ? order?.totalPrice.toLocaleString()
                      : "N/A"}{" "}
                    VND
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order?.orderStatus === "Pending"
                          ? "bg-gray-100 text-gray-600"
                          : order?.orderStatus === "Processing"
                          ? "bg-blue-100 text-blue-600"
                          : order?.orderStatus === "Shipped"
                          ? "bg-orange-100 text-orange-600"
                          : order?.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order?.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-600"
                          : ""
                      }`}
                    >
                      {order?.orderStatus}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-xs">
                    <span
                      onClick={() => handleViewOrder(order)}
                      className="mr-2 text-blue-500 cursor-pointer"
                    >
                      Xem
                    </span>
                    {order?.orderStatus === "Delivered" ||
                    order?.orderStatus === "Cancelled" ? (
                      ""
                    ) : (
                      <span
                        onClick={() => handleCancelOrder(order?._id)}
                        className="text-red-500 cursor-pointer"
                      >
                        Hủy
                      </span>
                    )}
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
      {selectedOrder && (
        <ViewOrder order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}

export default Myorder;
