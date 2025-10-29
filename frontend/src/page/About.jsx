import React from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import {
  CiBag1,
  CiFacebook,
  CiGift,
  CiInstagram,
  CiShop,
  CiTwitter,
} from "react-icons/ci";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { Link } from "react-router-dom";

function About() {
  const descriptions = [
    { number: "10.5k", des: "Người bán hoạt động trên trang của chúng tôi", icon: <CiShop /> },
    { number: "15k", des: "Sản phẩm bán hàng tháng", icon: <BsCoin /> },
    { number: "45.5k", des: "Khách hàng hoạt động trên trang của chúng tôi", icon: <CiGift /> },
    { number: "25k", des: "Tổng doanh thu hàng năm trên trang của chúng tôi", icon: <CiBag1 /> },
    {
      number: "GIAO HÀNG MIỄN PHÍ VÀ NHANH",
      des: "Miễn phí giao hàng cho tất cả các đơn hàng trên $140",
      icon: <FaShippingFast />,
    },
    {
      number: "DỊCH VỤ KHÁCH HÀNG 24/7",
      des: "Hỗ trợ khách hàng thân thiện 24/7",
      icon: <MdOutlineHeadsetMic />,
    },
    {
      number: "ĐẢM BẢO HOÀN TIỀN",
      des: "Chúng tôi hoàn tiền trong vòng 30 ngày",
      icon: <AiOutlineFileProtect />,
    },
  ];
  return (
    <div className="max-w-screen-xl lg:mx-auto my-16 mx-2">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Trang chủ
        </Link>
        /<span>Giới thiệu</span>
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-8">
          <h2 className="capitalize text-2xl font-semibold lg:text-4xl">
            Câu chuyện của chúng tôi
          </h2>
          <p className="font-normal text-[14px] lg:text-base text-justify">
            Được ra mắt vào năm 2022, Ondia là một trong những nền tảng mua sắm trực tuyến hàng đầu tại Việt Nam. Với sự hỗ trợ của nhiều giải pháp marketing, dữ liệu và dịch vụ.
          </p>
          <p className="font-normal text-[14px] lg:text-base text-justify">
            Ondia có hơn 100  sản phẩm để cung cấp và đang phát triển rất nhanh. Ondia cung cấp một loạt sản phẩm đa dạng trong thiết bị gia đình và gia dụng, từ tiêu dùng đến các mặt hàng khác.
          </p>
        </div>
        <img
          src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_12_27_638392840584950312_anh-dai-dien.jpg"
          alt=""
        />
      </div>

      <div className="grid grid-cols-4 gap-2 lg:gap-8 my-16">
        {descriptions.map(
          (des, index) =>
            index < 4 && (
              <div
                key={index}
                className="relative flex w-full justify-center rounded-md border border-gray-100 bg-white shadow-md group hover:bg-primary transition-colors duration-300 ease-in-out p-3"
              >
                <div className="flex flex-col gap-y-3 justify-center items-center rounded-md group-hover:text-white transition-colors duration-300 ease-in-out">
                  <span className="flex items-center justify-center text-[28px] lg:text-[48px] p-2 rounded-full border group-hover:bg-white group-hover:text-primary bg-black text-white outline outline-4 outline-gray-400">
                    {des.icon}
                  </span>
                  <span className="font-semibold text-[12px] lg:text-lg">
                    {des.number}
                  </span>
                  <span className="text-[10px] lg:text-lg text-center">
                    {des.des}
                  </span>
                </div>
              </div>
            )
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 lg:gap-8 my-16">
        {descriptions.map(
          (des, index) =>
            index >= 4 && (
              <div
                key={index}
                className="relative flex w-full justify-center rounded-md border border-gray-100 bg-white shadow-md group transition-colors duration-300 ease-in-out p-3"
              >
                <div className="flex flex-col gap-y-3 justify-center items-center rounded-md  transition-colors duration-300 ease-in-out">
                  <span className="flex items-center justify-center text-[28px] lg:text-[48px] p-2 rounded-full border bg-black text-white outline outline-4 outline-gray-400">
                    {des.icon}
                  </span>
                  <span className="font-semibold text-[12px] lg:text-lg text-center">
                    {des.number}
                  </span>
                  <span className="text-[10px] lg:text-lg text-center">
                    {des.des}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default About;
