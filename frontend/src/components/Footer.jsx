import { FiPhone } from "react-icons/fi";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import {
  MdLocalPhone,
  MdLocationPin,
  MdOutlineMailOutline,
} from "react-icons/md";
import bocongthuong from "../assets/images/bocongthuong.png";
import img1 from "../assets/images/Dia-chi-web-01.jpg";
import img2 from "../assets/images/Dia-chi-web-02.jpg";
import img3 from "../assets/images/Dia-chi-web-03.jpg";
import img4 from "../assets/images/Dia-chi-web-04.jpg";
import img5 from "../assets/images/Dia-chi-web-05.png";
import img6 from "../assets/images/Dia-chi-web-06.png";
import { Link } from "react-router-dom";

function Footer() {
  const pageUrl = "https://www.facebook.com/profile.php?id=61556754290337";
  const width = 300;
  const height = 200;
  const appId = "495054187500003";
  const locations = [
    {
      image: img1,
      address: "193-195 Hoàng Văn Thụ, TP Bắc Giang",
      phone: "020 4633 1666",
      hours: "Giờ mở cửa: 8h-22h",
    },
    {
      image: img2,
      address: "Tầng 2, GO Mall, Tân Tiến, TP Bắc Giang",
      phone: "020 4652 1666",
      hours: "Giờ mở cửa: 8h-22h",
    },
    {
      image: img3,
      address: "Số 703 Minh Khai, TT Chũ, Lục Ngạn, Bắc Giang",
      phone: "0204 6531 666",
      hours: "Giờ mở cửa: 7h-21h30",
    },
    {
      image: img4,
      address: "Số 520 Hoàng Văn Thái, TT Thắng, Hiệp Hòa, Bắc Giang",
      phone: "0204 6299 666",
      hours: "Giờ mở cửa: 7h-21h30",
    },
    {
      image: img5,
      address: "Tầng 2, Vincom Plaza Bắc Giang",
      phone: "0865339192",
      hours: "Giờ mở cửa: 8h-22h",
    },
    {
      image: img6,
      address: "Tầng 2, Vincom Plaza Bắc Giang",
      phone: "0865339192",
      hours: "Giờ mở cửa: 8h-22h",
    },
  ];

  return (
    <div className="w-full px-4">
      <hr />
      <div className="max-w-screen-2xl bg-transparent text-[15px] font-normal mx-auto py-12 grid grid-cols-1 lg:grid-cols-4">
        <div>
          <h2 className="font-semibold text-lg mb-4">Thông tin chung</h2>
          <p className="mb-4 flex items-center gap-2">
            <FiPhone size={20} />
            Hotline: 0988 917 388
          </p>
          <p className="mb-4 flex items-center gap-2">
            <FaRegFolderOpen size={20} />
            Giới thiệu
          </p>
          <p className="mb-4 flex items-center gap-2">
            <MdOutlineMailOutline size={20} />
            Email: smarthomevn2022@gmail.com
          </p>
          <a href="http://online.gov.vn/(X(1)S(c00f5rff5upbplg4d1rvdfaw))/Home/WebDetails/105598?AspxAutoDetectCookieSupport=1">
            <img
              alt="Đã thông báo Bộ Công Thương"
              className="mb-4"
              height="50"
              src={bocongthuong}
              width="150"
            />
          </a>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">Chính sách</h2>
          <ul className="list-disc pl-6 list-inside space-y-4">
            <li className="hover:text-primary">
              <Link to={"/chinh-sach-giao-hang"}>Chính sách giao hàng</Link>
            </li>
            <li className="hover:text-primary">
              <Link to={"/huong-dan-mua-hang-online"}>
                Hướng dẫn mua hàng Online
              </Link>
            </li>
            <li className="hover:text-primary">
              <Link to={"/policy"}>Thông tin về điều kiện giao dịch chung</Link>
            </li>
            <li className="hover:text-primary">
              <Link to={"/cac-phuong-thuc-thanh-toan"}>
                Thông tin về các phương thức thanh toán
              </Link>
            </li>
            <li className="hover:text-primary">
              <Link to={"/van-chuyen-va-giao-nhan"}>
                Thông tin về vận chuyển và giao nhận
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-4">Liên Kết</h2>
          <ul className="list-disc pl-6 list-inside space-y-4">
            <li className="hover:text-primary">
              <a href="https://ondia.vn/tin-hot/">Tin hot</a>
            </li>
            <li className="hover:text-primary">
              <a href="https://ondia.vn/meo-vat/">Mẹo vặt</a>
            </li>
            <li className="hover:text-primary">
              <a href="https://ondia.vn/khuyen-mai/">Khuyến mãi</a>
            </li>
          </ul>
        </div>
        <div>
          <iframe
            title="Facebook Page Plugin"
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
              pageUrl
            )}&tabs=timeline&width=${width}&height=${height}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=${appId}`}
            width={width}
            height={height}
            style={{ border: "none", overflow: "hidden" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>
      <div className="max-w-screen-2xl bg-transparent text-[15px] font-normal mx-auto py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {locations.map((location, index) => (
          <div key={index} className="mb-6">
            <img src={location.image} className="mb-4" alt="" />
            <p className="mb-4 flex items-center gap-2">
              <MdLocationPin size={20} />
              {location.address}
            </p>
            <p className="mb-4 flex items-center gap-2">
              <MdLocalPhone size={20} />
              {location.phone}
            </p>
            <p className="mb-4 flex items-center gap-2">
              <GoClock size={20} />
              {location.hours}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
