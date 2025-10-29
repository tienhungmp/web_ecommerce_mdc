import React from "react";
import { IoIosArrowRoundDown } from "react-icons/io";

function Policy() {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center text-primary">
        Chính Sách Bảo Hành
      </h1>

      <p className="mb-4 text-sm lg:text-base">
        Chúng tôi xin chân thành cảm ơn Quý khách hàng đã tin tưởng lựa chọn và
        mua sắm các sản phẩm tại Ondia.
      </p>

      <p className="mb-4 text-sm lg:text-base">
        Ondia cam kết tất cả các sản phẩm bán ra tại hệ thống của chúng tôi đều
        là sản phẩm chính hãng, được bảo hành đúng theo quy định của Hãng sản
        xuất cũng như chính sách bảo hành riêng của chúng tôi.
      </p>
      <p className="mb-4 text-sm lg:text-base">
        Dưới đây là chính sách bảo hành của Ondia áp dụng chung cho tất cả các
        sản phẩm (đối với các sản phẩm thương hiệu ECOVACS, chúng tôi có thêm
        một số lưu ý riêng so với Chính sách chung này). Ondia luôn nỗ lực nhằm mang lại những trải nghiệm
        mua sắm hài lòng nhất đến Quý khách.
      </p>

      <h2 className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        1. NGUYÊN TẮC BẢO HÀNH
      </h2>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>
          Chính sách bảo hành của Ondia chỉ áp dụng cho các sản phẩm do Ondia
          phân phối hoặc được ủy quyền tiếp nhận bảo hành từ hãng sản xuất.
        </li>
        <li>
          Chương trình bảo hành bắt đầu có hiệu lực từ thời điểm Ondia xuất hóa
          đơn/Phiếu mua hàng/Phiếu xuất kho cho Quý khách. Thời hạn bảo hành
          được quy định trên từng đường link sản phẩm cụ thể được đăng tải trên
          website Ondia hoặc căn cứ thời hạn bảo hành trên chứng từ mua hàng
          (với các sản phẩm được lựa chọn thời hạn bảo hành).
        </li>
        <li>
          Mỗi sản phẩm sẽ có chính sách, thời hạn bảo hành khác nhau tùy theo
          đặc thù của sản phẩm và quy định của Hãng sản xuất.
        </li>
        <li>
          Để tìm hiểu thông tin chi tiết về chính sách bảo hành cho sản phẩm cụ
          thể, xin liên hệ bộ phận Tiếp nhận bảo hành của Ondia theo hotline:
          1900-633-870.
        </li>
        <li>
          Đối với các sản phẩm có sử dụng pin hoặc các phụ kiện điện (như điều
          khiển từ xa,...), thời hạn bảo hành của pin và các phụ kiện điện này
          sẽ được tính bằng nửa thời gian bảo hành của sản phẩm chính.
        </li>
        <li>
          Các linh kiện thay thế, sửa chữa hoặc sản phẩm đổi trả sẽ được bảo
          hành 3 tháng tính từ ngày khách hàng nhận lại sản phẩm, hoặc theo thời
          hạn bảo hành còn lại của sản phẩm, tùy theo thời hạn nào dài hơn
        </li>
      </ul>

      <h2 className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        2. ĐIỀU KIỆN BẢO HÀNH
      </h2>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>
          Sản phẩm đủ điều kiện bảo hành theo công bố chính thức của hãng sản
          xuất.
        </li>
        <li>
          Sản phẩm còn vỏ sản phẩm cùng phụ kiện đi kèm (ví dụ: điều khiển, dây
          sạc, củ sạc, thẻ, chân đế, ốc vít, phụ kiện lắp đặt…)
        </li>
        <li>
          Số Seri, imei định danh sản phẩm phải rõ nét, trùng khớp với chứng từ
          mua bán hàng hóa.
        </li>
      </ul>

      <h2 className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        3. CÁC TRƯỜNG HỢP KHÔNG ĐƯỢC BẢO HÀNH MIỄN PHÍ
      </h2>
      <p className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        Những trường hợp dưới đây không nằm trong chính sách bảo hành miễn phí
        của Nhà sản xuất:
      </p>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>
          Sản phẩm có lỗi do người dùng lắp đặt, sử dụng, bảo quản sản phẩm
          không đúng hướng dẫn, khuyến cáo của Nhà sản xuất.
        </li>
        <li>
          Người dùng can thiệp cải tạo hình thức, công năng máy, up ROM, chạy
          phần mềm không chính hãng, root máy, các hình thức can thiệp phần cứng
          và phần mềm khác...
        </li>
        <li>
          Tài khoản và password của quý khách đăng nhập không hợp lệ (bao gồm cả
          trường hợp máy bật không lên).
        </li>
        <li>
          Sản phẩm có dấu hiệu hư hỏng do bị cạy mở, mất, rách tem bảo hành, bị
          tác động của ngoại lực, bị động vật xâm nhập, sản phẩm bị tác động bởi
          hỏa hoạn, thiên tai, hóa chất, chất lỏng...
        </li>
        <li>Lỗi do hao mòn tự nhiên.</li>
        <li>
          Các vết trầy xước, cấn móp, tróc sơn không thuộc phạm vi bảo hành.
        </li>
      </ul>
      <p className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        Với các sản phẩm không thuộc phạm vi bảo hành miễn phí, Ondia cung cấp
        dịch vụ chăm sóc, sửa chữa sản phẩm theo nhu cầu có tính phí
      </p>

      <h2 className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        4. QUY TRÌNH BẢO HÀNH
      </h2>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>
          <span className="font-semibold">
            Thời gian thực hiện hiện việc bảo hành:
          </span>{" "}
          thời gian tiêu chuẩn là 15 ngày làm việc tính từ ngày chúng tôi nhận
          được sản phẩm (không bao gồm ngày nghỉ, ngày lễ). Thời gian bảo hành
          có thể sẽ được rút ngắn hoặc kéo dài phụ thuộc vào tình trạng sản phẩm
          và được chúng tôi thông báo cụ thể cho Quý khách.
        </li>
        <li>
          <span className="font-semibold">
            Địa điểm tiếp nhận sản phẩm cần bảo hành:
          </span>{" "}
          Quý khách có thể trực tiếp mang sản phẩm tới tất cả các showroom của
          Ondia trên toàn quốc, hoặc gửi chuyển phát nhanh tới trung tâm bảo
          hành gần nhất của chúng tôi theo hướng dẫn của nhân viên tư vấn
          (Hotline 1900-633-870).
        </li>
        <li>
          <span className="font-semibold">
            Phí vận chuyển sản phẩm bảo hành:
          </span>
          Quý khách vui lòng thanh toán phí vận chuyển khi gửi hàng bảo hành,
          Ondia sẽ thanh toán phí vận chuyển khi hoàn trả lại sản phẩm tới Quý
          khách.
        </li>
      </ul>
      <p className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        Lưu ý: Quý khách vui lòng tự sao lưu tất cả các dữ liệu cá nhân trước
        khi mang sản phẩm tới trung tâm bảo hành, trong quá trình bảo hành
        Ondia không chịu trách nhiệm về mọi mất mát dữ liệu cá nhân và các ứng
        dụng cài đặt thêm được lưu trữ trong máy.
      </p>
      <div className="flex items-center flex-col">
        <p className="py-3 px-5 border border-primary w-full lg:w-1/2 text-center">
          Khách hàng gửi thông tin yêu cầu bảo hành tới Ondia
        </p>
        <IoIosArrowRoundDown size={35} />
        <p className="py-3 px-5 border border-primary w-full lg:w-1/2 text-center">
          Ondia tiếp nhận sản phẩm gửi đến từ khách hàng
        </p>
        <IoIosArrowRoundDown size={35} />
        <p className="py-3 px-5 border border-primary w-full lg:w-1/2 text-center">
          Ondia thực hiện đánh giá, đưa ra phương án sửa chữa bảo hành (Thông
          báo, xác nhận phí dịch vụ và sửa chữa nếu có từ khách hàng)
        </p>
        <IoIosArrowRoundDown size={35} />
        <p className="py-3 px-5 border border-primary w-full lg:w-1/2 text-center">
          Ondia thông báo sản phẩm đã hoàn thành sửa chữa, xác nhận thông tin địa
          chỉ và thực hiện hoàn trả sản phẩm
        </p>
        <IoIosArrowRoundDown size={35} />
        <p className="py-3 px-5 border border-primary w-full lg:w-1/2 text-center">
          Hoàn tất dịch vụ bảo hành khi khách hàng đã nhận lại sản phẩm.
        </p>
      </div>

      <h2 className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        CHÍNH SÁCH BẢO HÀNH CỦA Ondia ĐỐI VỚI SẢN PHẨM ECOVACS
      </h2>
      <p className="mb-4 text-sm lg:text-base">
        Chính sách bảo hành này được áp dụng riêng cho các sản phẩm mang thương
        hiệu ECOVACS. Các nội dung không được sửa đổi, bổ sung hay quy định chi
        tiết bởi chính sách riêng này sẽ tuân thủ theo quy định bảo hành chung
        của Ondia
      </p>

      <h2 className="text-base lg:text-lg font-semibold mt-8 mb-4">
        1. SẢN PHẨM ĐƯỢC HƯỞNG CHÍNH SÁCH BẢO HÀNH MIỄN PHÍ
      </h2>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>Các sản phẩm mang nhãn hiệu Ecovacs do Ondia cung cấp.</li>
        <li>
          Bảo hành do lỗi vật liệu và gia công trên sản phẩm trong điều kiện sử
          dụng bình thường.
        </li>
        <li>Chỉ bảo hành cho sản phẩm chính.</li>
        <li>Chỉ bảo hành khi sản phẩm còn tem serial.</li>
      </ul>
      <h2 className="text-base lg:text-lg font-semibold mt-8 mb-4">
        2. CÁC TRƯỜNG HỢP KHÔNG ÁP DỤNG CHÍNH SÁCH BẢO HÀNH MIỄN PHÍ
      </h2>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>KHÔNG áp dụng bảo hành đối với cảm ứng và màn hình của máy.</li>
        <li>
          KHÔNG bảo hành các thành phần dễ ăn mòn như: Pin điều khiển từ xa, giẻ
          lau nhà, cây lau nhà, bộ lọc, chổi chính, chổi phụ, dung dịch làm
          sạch, cốc và chổi cao su, bánh xe…
        </li>
        <li>KHÔNG áp dụng cho phụ kiện đi kèm sản phẩm chính.</li>
      </ul>

      <h2 className="text-base lg:text-lg font-semibold mt-8 mb-4">
        3. CAM KẾT BẢO HÀNH
      </h2>
      <p className="font-semibold">Ondia cam kết:</p>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>
          Hoàn thành quy trình bảo hành trong vòng tối đa 15 ngày (tính từ ngày
          nhận máy ở trạng thái lỗi đến ngày tiến hành xong việc bảo hành).
        </li>
        <li>
          Sản phẩm không phải bảo hành lại trong vòng 30 ngày kể từ ngày khách
          hàng nhận được sản phẩm đã hoàn thành quy trình bảo hành.
        </li>
      </ul>
      <p className="mb-4 font-semibold text-sm lg:text-base">
      Nếu Ondia vi phạm cam kết nêu trên, chúng tôi sẽ gửi tặng Quý khách gói dịch vụ Premium Care miễn phí như sau:
      </p>
      <table className="min-w-full bg-white text-sm lg:text-base border border-gray-300">
  <thead>
    <tr>
      <th className="py-2 px-4 border-b bg-gray-100 text-left border-r">Sản phẩm có giá dưới 10 triệu đồng.</th>
      <th className="py-2 px-4 border-b bg-gray-100 text-left">Sản phẩm có giá trên 10 triệu đồng.</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="py-2 px-4 border-b border-r">Gói Premium Care thời hạn sử dụng trong 1 tháng.</td>
      <td className="py-2 px-4 border-b">Gói Premium Care thời hạn sử dụng trong 2 tháng.</td>
    </tr>
  </tbody>
</table>

      <h2 className="text-lg lg:text-xl font-semibold mt-8 mb-4">
        4. KHUYẾN CÁO
      </h2>
      <ul className="list-disc list-inside text-sm lg:text-base">
        <li>
        Quý khách không nên sử dụng sạc không theo đúng quy chuẩn của nhà sản xuất (sẽ gây lỗi nguồn sản phẩm), không sử dụng các loại nước lau sàn/tinh dầu không phải do Ecovacs sản xuất (tránh việc chất lỏng không tương thích làm giảm tuổi thọ hoặc làm hỏng robot).
        </li>
        <li>
        Quý khách vui lòng tự sao lưu tất cả các dữ liệu cá nhân trước khi mang sản phẩm tới trung tâm bảo hành, trong quá trình bảo hành Ondia không chịu trách nhiệm về mọi mất mát dữ liệu cá nhân và các ứng dụng cài đặt thêm được lưu trữ trong máy.
        </li>
        <li>
        Các linh kiện thay thế, sửa chữa hoặc sản phẩm đổi trả sẽ được bảo hành 3 tháng tính từ ngày khách hàng nhận lại sản phẩm, hoặc theo thời hạn bảo hành còn lại của sản phẩm, tùy theo thời hạn nào dài hơn.</li>
      </ul>
    </div>
  );
}

export default Policy;
