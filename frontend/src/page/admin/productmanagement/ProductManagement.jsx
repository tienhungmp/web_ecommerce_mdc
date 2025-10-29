import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SummaryApi } from "../../../common";
import LoadingPage from "../../../components/loading/LoadingPage";
import { toast } from "react-toastify";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import ProductManagementTable from "./ProductManagementTable";
import { IoAdd } from "react-icons/io5";
import AddProductModal from "./AddProductModal";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [warranties, setWarrenties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null); // Timeout state
  const limit = 10;
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalProducts);

  // Fetch products with optional search term
  const fetchProducts = useCallback(
    async (search = "") => {
      setLoading(true);
      try {
        const response = await axios({
          url: `${SummaryApi.getAllProducts.url}?page=${page}&limit=${limit}&search=${search}`,
          method: SummaryApi.getAllProducts.method,
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const { products, total_pages, total_products } = response.data;
        setProducts(products);
        setTotalPages(total_pages);
        setTotalProducts(total_products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch product data.");
      } finally {
        // setTimeout(() => setLoading(false), 800);
        setLoading(false);
      }
    },
    [page]
  );

  const fetchWarranties = useCallback(async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllWarranty.url,
        method: SummaryApi.getAllWarranty.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data.warranties;
      setWarrenties(dataApi)
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data;

      const sortCategories = (categories) => {
        const map = new Map(categories.map((cat) => [cat._id, cat]));
        const sorted = [];

        categories.forEach((category) => {
          if (!category.parentCategory) {
            sorted.push(category);
          } else if (map.has(category.parentCategory._id)) {
            const parentIndex = sorted.findIndex(
              (cat) => cat._id === category.parentCategory._id
            );
            sorted.splice(parentIndex + 1, 0, category);
          }
        });

        return sorted;
      };

      const sortedCategories = sortCategories(dataApi.categories);
      setCategories(sortedCategories);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      fetchProducts(value);
    }, 500);

    setTypingTimeout(newTimeout);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(searchTerm); // Fetch products when search is submitted
  };

  // Handle product removal
  const handleRemoveProduct = useCallback(
    async (id) => {
      if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
      try {
        const url = SummaryApi.deleteProduct.url.replace(":id", id);
        await axios({
          url,
          method: SummaryApi.deleteProduct.method,
          withCredentials: true,
        });

        toast.success("Sản phẩm đã được xóa thành công!");
        fetchProducts(searchTerm); // Reload products with current search term
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        toast.error("Không thể xóa sản phẩm.");
      }
    },
    [fetchProducts, searchTerm]
  );

  // Pagination component
  const Pagination = () => (
    <div className="flex items-center justify-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`p-1 rounded-full text-sm flex items-center justify-center border ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed text-white"
            : "bg-primary text-white"
        }`}
      >
        <HiOutlineArrowSmLeft size={15} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <span
          key={index}
          className={`p-1 rounded-full text-sm w-7 h-7 flex items-center justify-center border cursor-pointer ${
            page === index + 1 ? "bg-primary text-white" : "bg-gray-300"
          }`}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </span>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        className={`p-1 rounded-full text-sm flex items-center justify-center border ${
          page === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-primary text-white"
        }`}
      >
        <HiOutlineArrowSmRight size={15} />
      </button>
    </div>
  );

  // Initial data fetch
  useEffect(() => {
    fetchProducts(searchTerm);
    fetchCategories();
    fetchWarranties()
  }, [fetchProducts, fetchCategories, fetchWarranties, searchTerm]);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Quản lí sản phẩm</h1>
      <div className="flex items-center justify-between">
        <button
          className="px-6 py-1 my-4 bg-primary text-xs text-white flex justify-center items-center rounded-sm"
          onClick={() => setShowAddModal(true)}
        >
          <IoAdd size={20} />
          <span>Thêm sản phẩm</span>
        </button>
        <form onSubmit={handleSearchSubmit} className="">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange} // Now using the debounced search function
            placeholder="Tìm kiếm sản phẩm..."
            className="px-3 py-1 border rounded outline-none text-sm w-64"
          />
        </form>
      </div>
      <ProductManagementTable
        products={products}
        categories={categories}
        onRemoveProduct={handleRemoveProduct}
      />
      <div className="my-4 flex items-center justify-between">
        <p className="text-primary text-center text-sm">
          Hiển thị từ {startIndex} - {endIndex} trên {totalProducts} sản phẩm
        </p>
        <Pagination />
      </div>
      {showAddModal && (
        <AddProductModal
          warranties={warranties}
          categories={categories}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default ProductManagement;
