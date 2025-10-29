import React from "react";

function PaymentMethods() {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-xl font-medium my-4">
        Thông tin về phương thức thanh toán
      </h1>
      <hr />
      <div className="my-4">
        <h2 className="text-base font-medium">1. Thanh toán trả trước</h2>
        <h2 className="text-base font-medium">2. Thanh toán trả sau (COD)</h2>
        <p className="text-sm mb-8">
          Là hình thức khách hàng thanh toán tiền mặt trực tiếp cho nhân viên
          vận chuyển khi nhận hàng.
        </p>
        <p className="text-sm mb-8">
          Khi hàng được chuyển giao đến bạn có thể kiểm tra tình trang gói hàng
          còn nguyên vẹn và mở gói hàng kiểm tra sản phẩm trước khi thanh toán.
          Nếu sản phẩm có bất kỳ lỗi hay khiếm khuyết nào không đúng ý muốn, bạn
          có thể trả lại nhân viên vận chuyển ngay tại thời điểm đó.
        </p>
      </div>
    </div>
  );
}

export default PaymentMethods;
