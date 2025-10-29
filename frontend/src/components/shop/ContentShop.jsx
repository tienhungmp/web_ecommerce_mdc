import React, { useEffect, useState, useCallback } from "react";
import { SummaryApi } from "../../common";
import axios from "axios";
import Cardproduct from "../cart/Cardproduct";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi"; // Import icons
import LoadingPage from "../loading/LoadingPage";

function ContentShop({ id, selectedBrands, selectedPriceRanges }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // State for sorting
  const [selectedSort, setSelectedSort] = useState("");

  const fetchProduct = useCallback(
    async (page) => {
      setLoading(true);

      // Construct the base URL for products
      let url = `${SummaryApi.getAllProducts.url}?page=${page}&limit=12&sort=${selectedSort}`;

      // Add filters (brands, price range)
      if (selectedBrands.length > 0) {
        url += `&company=${selectedBrands.join(",")}`;
      }
      if (selectedPriceRanges && selectedPriceRanges.length > 0) {
        const [minPrice, maxPrice] = selectedPriceRanges;
        url += `&priceRange=${minPrice}-${maxPrice}`;
      }

      // Handle category-specific URL
      if (id) {
        url = `${SummaryApi.getProductsByCategory.url.replace(":id", id)}?page=${page}&limit=12&sort=${selectedSort}`;
        if (selectedBrands.length > 0) {
          url += `&company=${selectedBrands.join(",")}`;
        }
        if (selectedPriceRanges && selectedPriceRanges.length > 0) {
          const [minPrice, maxPrice] = selectedPriceRanges;
          url += `&priceRange=${minPrice}-${maxPrice}`;
        }
      }

      try {
        const response = await axios.get(url, { withCredentials: true });
        const data = response.data;
        setProducts(data.products);
        setTotalPages(data.total_pages);
        console.log("url",url);
       console.log('product',products);
       
      } catch (err) {
        setProducts([]);
        setError(err.response?.data?.message || "Lỗi khi tải dữ liệu");
      } finally {
        setTimeout(()=>setLoading(false),800)
      }
    },
    [id, selectedSort, selectedBrands, selectedPriceRanges] // Added dependencies
  );

  useEffect(() => {
    fetchProduct(currentPage);
  }, [fetchProduct, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setCurrentPage(1); // Reset to the first page whenever sorting changes
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm my-8 lg:my-4">
        <h1 className="w-1/2 lg:w-96">Hiển thị {products.length} sản phẩm</h1>
        <div className="w-1/2 lg:w-96 flex items-center justify-end">
          <label className="mr-2 hidden lg:block">Sắp xếp theo:</label>
          <select
            className="mt-1 px-3 py-1 w-full lg:w-1/2 border rounded outline-none"
            value={selectedSort}
            onChange={handleSortChange}
          >
            <option value="">--- Chọn ---</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="newest">Mới nhất</option>
            <option value="best-seller">Bán chạy nhất</option>
          </select>
        </div>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6 pb-10">
        {products.length === 0 ? (
          <li className="col-span-full text-center">Không có sản phẩm nào</li>
        ) : (
          products.map((product) => (
            <Cardproduct key={product._id} item={product} />
          ))
        )}
      </ul>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-4 items-center mt-6 justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`p-2 rounded-full flex items-center border justify-center ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed text-white"
                : "bg-primary text-white"
            }`}
          >
            <HiOutlineArrowSmLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index}
              className={`p-2 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-black"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`p-2 rounded-full flex items-center border justify-center ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed text-white"
                : "bg-primary text-white"
            }`}
          >
            <HiOutlineArrowSmRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

export default ContentShop;
