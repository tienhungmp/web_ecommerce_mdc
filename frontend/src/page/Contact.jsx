import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { MdPhoneCallback } from "react-icons/md";
import { Link } from "react-router-dom";
import { SummaryApi } from "../common";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Kiểm tra các trường bắt buộc
    if (!data.name || !data.phone || !data.email || !data.message) {
      toast.error(
        "Vui lòng điền đầy đủ thông tin vào tất cả các trường bắt buộc."
      );
      return;
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ.");
      return;
    }

    try {
      await axios({
        url: SummaryApi.createFeedback.url,
        method: SummaryApi.createFeedback.method,
        data: data,
        withCredentials: true,
      });
      toast.success("Gửi thông tin thành công!");
      setData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <p className="my-10">
        <Link to="/" className="text-gray-500 hover:underline">
          Trang chủ
        </Link>
        /<span>Liên hệ</span>
      </p>
      <div className="grid grid-cols-1 m-4 space-y-8 lg:grid-cols-3 my-4 lg:my-12 lg:space-x-4">
        <div className="col-span-1 grid grid-cols-2 lg:grid-cols-1 shadow-md px-2 lg:px-8 py-6 lg:space-y-8">
          <div className="space-y-4">
            <div className="flex gap-4 items-center m-4">
              <span className="bg-primary text-white p-2 flex items-center justify-center rounded-full">
                <MdPhoneCallback size={25} />
              </span>
              <span>Liên hệ với chúng tôi</span>
            </div>
            <h2 className="text-sm">
              Chúng tôi có mặt 24/7, 7 ngày trong tuần.
            </h2>
            <h2 className="text-sm">Hotline: 0988 917 388</h2>
          </div>
          <hr className="hidden lg:block" />
          <div className="space-y-4">
            <div className="flex gap-4 items-center m-4">
              <span className="bg-primary text-white p-2 flex items-center justify-center rounded-full">
                <CiMail size={25} />
              </span>
              <span>Gửi cho chúng tôi</span>
            </div>
            <h2 className="text-sm">
              Điền vào mẫu của chúng tôi và chúng tôi sẽ liên hệ với bạn trong
              vòng 24 giờ.
            </h2>
            <h2 className="text-sm">Email: smarthomevn2022@gmail.com</h2>
          </div>
        </div>
        <div className="col-span-2 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="yourname"
                    className="bg-white text-gray-600 px-1"
                  >
                    Your name *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="yourname"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                />
              </p>
            </div>

            <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="yourphone"
                    className="bg-white text-gray-600 px-1"
                  >
                    Your phone *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="yourphone"
                  name="phone"
                  value={data.phone}
                  onChange={handleOnChange}
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                />
              </p>
            </div>

            <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
                <p>
                  <label
                    htmlFor="youremail"
                    className="bg-white text-gray-600 px-1"
                  >
                    Email *
                  </label>
                </p>
              </div>
              <p>
                <input
                  id="youremail"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  type="text"
                  className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                />
              </p>
            </div>
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <p>
                <label
                  htmlFor="message"
                  className="bg-white text-gray-600 px-1"
                >
                  Your Message *
                </label>
              </p>
            </div>
            <p>
              <textarea
                id="message"
                name="message"
                value={data.message}
                onChange={handleOnChange}
                className="py-1 px-1 text-gray-900 outline-none block min-h-36 lg:min-h-60 w-full"
              />
            </p>
          </div>

          <div className="flex items-center gap-8 justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm px-5 py-2.5 font-semibold tracking-wide bg-transparent text-primary border border-primary hover:bg-primary hover:text-white rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
