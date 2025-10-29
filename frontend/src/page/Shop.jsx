import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ContentShop from "../components/shop/ContentShop";
import Sidebar from "../components/shop/Sidebar";
import { SummaryApi } from "../common";
import { IoMdArrowDropdown } from "react-icons/io";
import { useParams } from "react-router-dom";
import Filter from "../components/shop/Filter";

function Shop() {
  let { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  // State lưu trữ các lựa chọn từ Filter
  const [selectedBrands, setSelectedBrands] = useState([]);  // Brands selected by the user
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);  // Price ranges selected by the user

  const getAllCategories = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = dataResponse.data;

      // Phân loại danh mục cha và con
      const parentCategories = dataApi.categories.filter(
        (category) => category.parentCategory === null
      );
      const childCategories = dataApi.categories.filter(
        (category) => category.parentCategory !== null
      );

      setCategories(parentCategories);
      setChildCategories(childCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = (state) => {
    setIsOpen(state ?? !isOpen);
  };

  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      toggleSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  // Hàm để cập nhật lựa chọn từ Filter
  const handleFilterChange = (filterData) => {
    setSelectedBrands(filterData.company);  // Set brands from filterData
    setSelectedPriceRanges(filterData.priceRange);  // Set price ranges from filterData
    console.log("Selected brands:", filterData.company);
    console.log("Selected price ranges:", filterData.priceRange);
  };

  return (
    <div className="max-w-screen-xl flex mx-2 lg:mx-auto gap-6 relative">
      <button
        className={`${isOpen ? "text-primary" : ""} absolute z-30 lg:hidden flex items-center text-[14px] top-1`}
        onClick={() => toggleSidebar()}
      >
        <IoMdArrowDropdown />
        Danh mục
      </button>

      <div
        ref={sidebarRef}
        className={`${isOpen ? "block" : "hidden"} w-2/5 lg:w-1/5 border-r pt-0 lg:pt-6 top-8 lg:top-0 bg-white lg:block absolute lg:relative z-40 shadow lg:shadow-none`}
      >
        <Sidebar
          categories={categories}
          childCategories={childCategories}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />
        <hr />
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <ContentShop
        id={id}
        selectedBrands={selectedBrands}  // Pass selected brands to ContentShop
        selectedPriceRanges={selectedPriceRanges}  // Pass selected price ranges to ContentShop
      />
    </div>
  );
}

export default Shop;
