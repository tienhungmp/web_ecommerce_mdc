import React, { useState } from 'react';
import Loading from '../components/loading/Loading';
import axios from 'axios';
import { SummaryApi } from '../common';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { FaRegEyeSlash } from 'react-icons/fa6';
import { IoEyeOutline } from 'react-icons/io5';

function ResetPassword() {
  const { id } = useParams(); // Lấy resetToken từ URL
  const [password, setPassword] = useState('');
  const [configPassword, setConfigPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Quản lý hiển thị mật khẩu
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu có khớp không
    if (password !== configPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    // Kiểm tra điều kiện mật khẩu (ít nhất 6 ký tự)
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Gửi yêu cầu API đặt lại mật khẩu
      const response = await axios({
        url: SummaryApi.resetPassword.url,
        method: SummaryApi.resetPassword.method,
        data: { resetToken: id, password },
        withCredentials: true,
      });

      if (response.status !== 200) {
        throw new Error(response.data.msg || 'Có lỗi xảy ra');
      }

      toast.success('Mật khẩu của bạn đã được đặt lại thành công!');
    } catch (error) {
      setError(error.response?.data?.msg || 'Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

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
            Tạo mật khẩu mới
          </h2>
          <form onSubmit={handleSubmit} className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
            {/* Input mật khẩu */}
            <div className="relative mt-8">
              <input
                autoComplete="off"
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'} // Loại hiển thị
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-5 text-gray-600 text-[13px] transition-all duration-200 ease-in-out
                  peer-placeholder-shown:-top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                  peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px]
                  peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
              >
                Mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                 {showPassword ? <IoEyeOutline size={20} /> :<FaRegEyeSlash size={20} />}
              </button>
            </div>

            {/* Input xác nhận mật khẩu */}
            <div className="relative mt-8">
              <input
                autoComplete="off"
                id="configpassword"
                name="configpassword"
                type={showPassword ? 'text' : 'password'} // Loại hiển thị
                value={configPassword}
                onChange={(e) => setConfigPassword(e.target.value)}
                required
                className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                placeholder=" "
              />
              <label
                htmlFor="configpassword"
                className="absolute left-0 -top-5 text-gray-600 text-[13px] transition-all duration-200 ease-in-out
                  peer-placeholder-shown:-top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440
                  peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px]
                  peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
              >
                Xác nhận mật khẩu
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <IoEyeOutline size={20} /> :<FaRegEyeSlash size={20} />}
              </button>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <span className="text-xs text-red-500">{error}</span>}

            {/* Nút gửi */}
            <button
              type="submit"
              className="px-4 py-3 w-full flex items-center justify-center gap-2 rounded-md text-center text-white font-bold bg-primary shadow-md hover:bg-[#f9851fda]"
            >
              Tạo mật khẩu mới {loading && <Loading />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
