import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { SummaryApi } from "../../common";

function OrderReceived() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showOrder = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: SummaryApi.getOrderById.url.replace(":id", orderId),
        method: SummaryApi.getOrderById.method,
        withCredentials: true,
      });

      setOrderDetails(response.data.order);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin đơn hàng:", error);
      setError("Không thể lấy thông tin đơn hàng. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const getPaymentMethodText = (paymentMethod) => {
    switch (paymentMethod) {
      case 'cod':
        return 'Thanh toán khi nhận hàng';
      case 'bank':
        return 'Chuyển khoản ngân hàng';
      case 'gop6':
        return 'Trả góp 6 tháng';
      case 'gop9':
        return 'Trả góp 9 tháng';
      case 'gop12':
        return 'Trả góp 12 tháng';
      default:
        return 'Phương thức thanh toán không xác định';
    }
  };

  useEffect(() => {
    if (id) {
      showOrder(id);
    }
  }, [id]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 lg:px-0 py-10">
      <div className="bg-green-100 text-center text-green-800 p-6">
        <div className="flex items-center gap-4 justify-center">
          <IoMdCheckmarkCircleOutline size={50} />
          <h2 className="text-xl font-semibold">Thanh toán thành công!</h2>
        </div>
        <p className="mt-2">
          Cảm ơn bạn đã đặt hàng! Thanh toán của bạn đã được xử lý thành công.
        </p>
      </div>

      {loading ? (
        <div className="text-center mt-4">Đang tải thông tin đơn hàng...</div>
      ) : error ? (
        <div className="text-center text-red-600 mt-4">{error}</div>
      ) : orderDetails ? (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-green-800">
          <h3 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h3>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Mã đơn hàng:</span> # {orderDetails._id}
            </div>
            <div>
              <span className="font-semibold">Phương thức thanh toán:</span>{" "}
              {getPaymentMethodText(orderDetails?.paymentMethod)}
            </div>
            <div>
              <span className="font-semibold">Địa chỉ giao hàng:</span>{" "}
              {orderDetails.shippingAddress}
            </div>
            <div>
              <span className="font-semibold">Số điện thoại:</span> {orderDetails.phone}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">Không có thông tin đơn hàng.</div>
      )}

      <div className="flex justify-between">
        <Link
          to="/"
          className="text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-md"
        >
          Về trang chủ
        </Link>
        <Link
          to="/myaccount/orders"
          className="text-primary border border-primary hover:bg-primary hover:text-white px-4 py-2 rounded-md"
        >
          Xem đơn hàng của tôi
        </Link>
      </div>
    </div>
  );
}

export default OrderReceived;
