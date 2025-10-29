import { useState } from "react";
import axios from 'axios';
import { SummaryApi } from './../common/index'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

function Register() {
  const [isShowPassword, setShowPassword] = useState(false);
  const [isShowConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };

  const showConfirmPassword = () => {
    setShowConfirmPassword(!isShowConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorName("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorConfirmPassword("");
    setLoading(true);

    let hasError = false;

    // Validation checks
    if (data.name.trim() === "") {
      setErrorName("Name is required");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setErrorEmail("Email sai định dạng.");
      hasError = true;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(data.password)) {
      setErrorPassword("Mật khẩu phải ít nhất 6 kí tự, bao gồm chữ hoa, chữ thường và số");
      hasError = true;
    }

    if (data.password !== data.confirmPassword) {
      setErrorConfirmPassword("Mật khẩu không giống nhau.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    try {
      await axios({
        url: SummaryApi.register.url,
        method: SummaryApi.register.method,
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
        data: data,
      });
      toast.success("User successfully registered.");
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1000); 
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast.error(error.response?.data?.msg || "Đăng ký thất bại. Vui lòng thử lại.");
      }, 1000); 
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
            Tạo tài khoản
          </h2>
          <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
            <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
              {/* Name input */}
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out top-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px] peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Tên
                </label>
                {errorName && <span className="text-xs text-red-500">{errorName}</span>}
              </div>
              {/* Email input */}
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out top-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px] peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Email
                </label>
                {errorEmail && <span className="text-xs text-red-500">{errorEmail}</span>}
              </div>
              {/* Password input */}
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type={isShowPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out top-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px] peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Mật khẩu
                </label>
                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={showPassword}
                >
                  {isShowPassword ? <IoEyeOutline className="text-primary" /> : <IoEyeOffOutline />}
                </span>
                {errorPassword && <span className="text-xs text-red-500">{errorPassword}</span>}
              </div>
              {/* Confirm Password input */}
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isShowConfirmPassword ? "text" : "password"}
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-2 -top-5 text-gray-600 text-base transition-all duration-200 ease-in-out top-2 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-focus:-top-5 peer-focus:left-0 peer-focus:text-gray-600 peer-focus:text-[13px] peer-valid:-top-5 peer-valid:left-0 peer-valid:text-[13px]"
                >
                  Xác nhận mật khẩu
                </label>
                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={showConfirmPassword}
                >
                  {isShowConfirmPassword ? <IoEyeOutline className="text-primary" /> : <IoEyeOffOutline />}
                </span>
                {errorConfirmPassword && <span className="text-xs text-red-500">{errorConfirmPassword}</span>}
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-3 w-full flex items-center justify-center gap-2 rounded-md text-center text-white font-bold bg-primary shadow-md ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#f9851fda]"
                }`}
              >
                Sign up {loading && <Loading />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
