import React, { useState, useEffect } from 'react';
import Loading from '../components/loading/Loading';
import axios from 'axios';
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0); // Thời gian đếm ngược

  const handleOnChange = (e) => {
    setEmail(e.target.value);
    setErrorEmail(''); // Xóa lỗi nếu người dùng tiếp tục nhập
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorEmail('Vui lòng nhập email');
      return;
    }
    // Kiểm tra format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorEmail('Email không hợp lệ');
      return;
    }

    setLoading(true);
    try {
      // Gửi yêu cầu API forgot password
      const response = await axios({
        url: SummaryApi.forgotpassword.url,
        method: SummaryApi.forgotpassword.method,
        data: { email },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error(response.data.msg || 'Có lỗi xảy ra');
      }
      toast.success('Mã đặt lại mật khẩu đã được gửi đến email của bạn!');
      setTimer(60); // Bắt đầu đếm ngược 60 giây
    } catch (error) {
      setErrorEmail('Người dùng không tồn tại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Xóa interval khi component unmount hoặc timer bằng 0
  }, [timer]);

  return (
    <div className="py-2 lg:py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm min-h-[640px] lg:max-w-4xl">
        <img
          className="hidden lg:block lg:w-1/2 object-cover"
          src="https://genk.mediacdn.vn/139269124445442048/2023/3/11/image2-1678430544115752600554-1678507891999-1678507892861387558657.jpg"
          alt=""
        />
        <div className="w-full my-auto p-4 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Quên mật khẩu
          </h2>
          <form onSubmit={handleSubmit} className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
            <div className="relative mt-8">
              <input
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleOnChange}
                required
                className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                placeholder=" "
                disabled={timer > 0} // Disable input nếu đang đếm ngược
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-5 text-gray-600 text-[13px] transition-all duration-200 ease-in-out
    peer-placeholder-shown:-top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
    peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px]
    peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
              >
                Email
              </label>
              {errorEmail && <span className="text-xs text-red-500">{errorEmail}</span>}
            </div>

            <button
              type="submit"
              className="px-4 py-3 w-full flex items-center justify-center gap-2 rounded-md text-center text-white font-bold bg-primary shadow-md hover:bg-[#f9851fda]"
              disabled={timer > 0 || loading} // Disable nút nếu đang đếm ngược hoặc đang loading
            >
              {timer > 0 ? `Gửi lại sau ${timer}s` : 'Gửi yêu cầu'}
              {loading && <Loading />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
