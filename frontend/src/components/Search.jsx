import { CiSearch } from "react-icons/ci";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { backendDomain, SummaryApi } from "../common";
import { Link } from "react-router-dom";
import { removeAccents } from "../utils/helpers";

function Search() {
  const [searchTerm, setSearchTerm] = useState(""); // State cho ô tìm kiếm
  const [products, setProducts] = useState([]); // State cho danh sách sản phẩm
  const [loading, setLoading] = useState(false); // State cho trạng thái loading
  const [isOpen, setIsOpen] = useState(false); // Trạng thái hiển thị danh sách
  const searchRef = useRef(null); // Tham chiếu đến phần tử chứa tìm kiếm và danh sách

  // Hàm gọi API tìm kiếm sản phẩm
  const fetchProducts = async (search) => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${SummaryApi.getAllProducts.url}?page=1&limit=100&search=${search}`,
        method: SummaryApi.getAllProducts.method,
        withCredentials: true,
      });

      const data = response.data;
      setProducts(data.products); // Cập nhật danh sách sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hàm thay đổi giá trị tìm kiếm
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      fetchProducts(value);
      setIsOpen(true);
    } else {
      setProducts([]);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setProducts([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  return (
    <div ref={searchRef} className="">
      <div className="flex items-center bg-gray-300 rounded relative">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="text-black block flex-grow rounded bg-transparent bg-clip-padding w-[210px] py-2 px-3 font-normal placeholder:text-gray-600 leading-[1.6] text-surface outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none text-[13px]"
          placeholder="Bạn đang tìm kiếm ...?"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <div className="flex items-center p-2 cursor-pointer">
          <CiSearch className="text-black size-5" />
        </div>
      </div>
      {isOpen && products.length > 0 && (
        <ul
          className="absolute z-50 bg-white shadow-lg mt-2 rounded w-[250px] max-h-96 overflow-y-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-primary"
        >
          {products.map((product) => (
            <li key={product?._id}>
              <Link
                to={`/products/${removeAccents(product.name).replaceAll(
                  " ",
                  "-"
                )}`}
                state={{ id: product?._id }}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={`${backendDomain}/${product?.avatar}`}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded mr-4"
                />
                <div className="flex flex-col text-xs">
                  <span className="font-medium text-xs">{product.name}</span>
                  {product.saleprice && product.saleprice > 0 ? (
                    <p className="flex items-center gap-2">
                      <span className="text-gray-600 text-[10px]">
                        {product.saleprice.toLocaleString()} đ
                      </span>
                      <span className="text-gray-600 text-[10px] line-through">
                        {product.price.toLocaleString()} đ
                      </span>
                    </p>
                  ) : (
                    <span className="text-gray-600 text-[10px]">
                      {product?.price.toLocaleString()} đ
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
