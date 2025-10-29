import React from "react";
import b1 from '../../assets/images/b1.jpg'
import b2 from '../../assets/images/b2.jpg'
import b3 from '../../assets/images/b3.jpg'

function Guide() {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-xl font-semibold my-4">Hướng dẫn mua hàng online</h1>
      <hr />
      <div className="my-4">
        <p className="text-sm mb-4">
          Để tiến hành mua hàng online tại Ondia DIGITAL, các bạn vui lòng làm
          theo các bước dưới đây:
        </p>
        <h2 className="text-sm font-medium">Bước 1: Thêm vào giỏ hàng</h2>
        <img src={b1} alt="anh1" />
        <h2 className="text-sm font-medium">Bước 2: Vào giỏ hàng - vào mục <strong>Thanh toán</strong></h2>
        <img src={b2} alt="anh2" />
        <h2 className="text-sm font-medium">Bước 3: Đặt hàng</h2>
        <p>Điền thông tin của bạn theo mẫu</p>
        <p>Chọn hình thức thanh toán</p>
        <p>1. Thanh toán chuyển khoản</p>
        <p>2. Thanh toán bằng tiền mặt</p>
        <p>3. Sau đó chọn <strong>"Đặt hàng"</strong></p>
        <img src={b3} alt="anh3" />
      </div>
    </div>
  );
}

export default Guide;
