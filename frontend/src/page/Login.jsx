import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import { SummaryApi } from './../common/index'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading/Loading";

function Login() {

  const [isShowPassword, setShowPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const userContext = useContext(Context)
  

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    setLoading(true);
    let hasError = false;
  
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
  
    if (hasError) {
      setLoading(false);
      return;
    }
  
    try {
      const dataResponse = await axios({
        url: SummaryApi.login.url,
        method: SummaryApi.login.method,
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
        credentials: 'include',
        data: data,
      });
  
      const dataApi = await dataResponse.data;
      console.log('Data received from server:', dataApi?.user?.role);
  
      setTimeout(() => {
        toast.success("Login successful!");
        setLoading(false);
        if(dataApi.user.role === 'admin'){
          navigate('/admin/users');
        }else{
          navigate('/');
          window.location.reload();
        }
      }, 1000);
  
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        toast.error(error.response.data.msg || "Đăng nhập thất bại.");
      }, 1000); // Giữ trạng thái loading trong 1 giây khi gặp lỗi
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
            Đăng nhập Ondia
          </h2>
          <form className="divide-y divide-gray-200" onSubmit={handleSubmit}>
            <div className="py-4 text-base leading-6 space-y-8 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  value={data.value}
                  onChange={handleOnChange}
                  required
                  className="peer placeholder-transparent h-8 w-full border-b pl-2 border-gray-300 text-gray-900 focus:outline-none focus:border-primary transition duration-200 ease-in-out"
                  placeholder=" "
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

              <div className="relative mt-8">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  onChange={handleOnChange}
                  type={isShowPassword ? "text" : "password"}
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
                  Password
                </label>
                <span
                  className="absolute right-3 top-2 cursor-pointer"
                  onClick={showPassword}
                >
                  {isShowPassword ? (
                    <IoEyeOutline className="text-primary" />
                  ) : (
                    <IoEyeOffOutline />
                  )}
                </span>
                {errorPassword && <span className="text-xs text-red-500">{errorPassword}</span>}
              </div>
              <div className="flex items-center justify-between mt-8">
                <div className="w-full lg:w-auto mb-0">
                  <label className="flex text-sm items-center" htmlFor="">
                    <input type="checkbox" />
                    <span className="ml-1">Ghi nhớ mật khẩu</span>
                  </label>
                </div>
                <div className="w-full lg:w-auto">
                  <a
                    className="text-sm inline-block text-gray-600 hover:underline focus:text-gray-800 focus:outline-none w-full"
                    href="/forgot-password"
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-3 w-full flex items-center justify-center gap-2 rounded-md text-center text-white font-bold bg-primary shadow-md hover:bg-[#f9851fda]"
              >
                Login {loading && <Loading/>}
              </button>
            </div>
          </form>
          <div className="inline-flex relative items-center justify-center w-full">
            <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
              or
            </span>
          </div>
          <p className="text-center text-sm text-gray-500">
            Bạn chưa có tài khoản?
            <a
              href="/register"
              className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none px-2"
            >
              Đăng kí
            </a>

          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
