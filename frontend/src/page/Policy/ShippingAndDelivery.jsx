import React from "react";

function ShippingAndDelivery() {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 uppercase border-b-2 border-gray-200 pb-2">
        Thông tin về phương thức vận chuyển
      </h1>
      <div className="space-y-6">
        {/* Section 1 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            1. PHƯƠNG THỨC GIAO HÀNG
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Công ty TNHH Đầu Tư Thương Mại Và Dịch Vụ Smart Home Việt Nam hỗ trợ
            quý khách mua hàng từ xa trên phạm vi cả nước và quốc tế. Quý khách
            có thể lựa chọn một trong các phương thức giao hàng:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>Giao hàng chuyển khoản trước</li>
            <li>Giao hàng thu tiền (COD)</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            2. PHÍ VẬN CHUYỂN:
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Chúng tôi miễn phí giao hàng trong phạm vi 10 km tính từ Công ty TNHH
            Đầu Tư Thương Mại Và Dịch Vụ Smart Home Việt Nam.
          </p>
          <p className="text-gray-600 text-sm mb-4">
            Ngoài phạm vi nêu trên, quý khách vui lòng thanh toán chi phí vận
            chuyển tùy theo phạm vi tương ứng.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>
              Trường hợp khách hàng lựa chọn hình thức giao hàng chuyển khoản
              trước, quý khách vui lòng chuyển khoản trước số tiền tương ứng với
              giá trị hàng hóa và phí vận chuyển hàng hóa. Chúng tôi sẽ báo cụ thể
              số tiền này cho Quý khách hàng.
            </li>
            <li>
              Trường hợp khách hàng lựa chọn hình thức giao hàng thu tiền (COD),
              khách hàng sẽ phải thanh toán giá hàng hóa và khoản phí thu hộ tuỳ
              theo biểu phí của bên cung cấp dịch vụ (nếu có). Chúng tôi sẽ báo cụ
              thể số tiền này cho khách hàng.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            3. THỜI GIAN XỬ LÝ ĐƠN HÀNG:
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Công ty TNHH Đầu Tư Thương Mại Và Dịch Vụ Smart Home Việt Nam sẽ liên
            hệ lại với khách hàng để xác nhận thông tin của đơn hàng.
          </p>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            3.1 Đặt hàng qua website
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>Đơn đặt hàng từ 8h30 – 17h00 thì chúng tôi sẽ liên hệ ngay trong ngày.</li>
            <li>Đơn đặt hàng sau 17h00 thì chúng tôi sẽ liên hệ vào sáng hôm sau.</li>
            <li>Đơn đặt hàng sau 17h00 thứ 7 và Chủ Nhật thì chúng tôi sẽ liên hệ lại trong thời gian sớm nhất có thể.</li>
          </ul>
          <h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
            3.2 Đặt hàng qua email smarthomevn2022@gmail.com
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>Đơn đặt hàng từ 8h30 – 17h00 thì chúng tôi sẽ liên hệ ngay trong ngày.</li>
            <li>Đơn đặt hàng sau 17h00 thì chúng tôi sẽ liên hệ vào sáng hôm sau.</li>
            <li>Đơn đặt hàng sau 17h00 thứ 7 và Chủ Nhật thì chúng tôi sẽ liên hệ lại trong thời gian sớm nhất có thể.</li>
          </ul>
          <h3 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
            3.3 Gọi điện trực tiếp vào hotline:
          </h3>
          <p className="text-gray-600 text-sm">
            Chúng tôi sẽ thông báo và thoả thuận cụ thể với khách hàng ngay khi
            nhận được cuộc gọi.
          </p>
        </div>

        {/* Additional Sections */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            4. THỜI GIAN ƯỚC TÍNH GIAO HÀNG
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            Công ty TNHH Đầu Tư Thương Mại Và Dịch Vụ Smart Home Việt Nam tiến
            hành giao hàng theo thời gian ước tính như sau:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>
              Giao hàng trong vòng 1 – 3 ngày kể từ khi xác nhận đơn hàng đối với
              khách hàng có địa chỉ trong tỉnh Bắc Giang.
            </li>
            <li>
              Đối với các địa phương khác, thời gian giao hàng sẽ phụ thuộc tùy
              vào vị trí địa lý và yêu cầu của khách hàng.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ShippingAndDelivery;
