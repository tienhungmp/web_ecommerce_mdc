import { useEffect, useState } from "react";
import Cardproduct from "../../cart/Cardproduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SummaryApi } from "../../../common";
import axios from "axios";

function ProductsByCategory({ category }) {
  const [viewAll, setViewAll] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Danh mục con
  const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục con được chọn

  // Lấy danh mục con của danh mục cha
  const getCategories = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
      });
      const dataApi = dataResponse.data;
      
      // Lọc danh mục con dựa trên _id của danh mục cha
      const subCategories = dataApi.categories.filter(
        (cat) => cat?.parentCategory?._id === category._id
      );

      // Thêm option "Xem tất cả"
      const allOption = { _id: category._id, name: "Xem tất cả" };
      setCategories([allOption, ...subCategories]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Lấy sản phẩm theo danh mục
  const renderProduct = async (id) => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getProductsByCategory.url.replace(":id", id),
        method: SummaryApi.getProductsByCategory.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
      setProducts(dataApi.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Khi click vào danh mục con
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    renderProduct(cat._id);
  };

  useEffect(() => {
    renderProduct(category._id);  // Load sản phẩm của danh mục cha mặc định
    getCategories();
  }, [category._id]);

  return (
    products.length > 0 ? (
      <div className="mt-12 lg:mt-24">
        <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-xl">Sản phẩm</span>
      </div>

        <div className="flex items-center gap-6 lg:gap-32 mt-5 mb-8">
          <span className="capitalize font-bold text-gray-700 text-xl lg:text-4xl">
            {category.name}
          </span>
        </div>

        {categories.length >1 ?(<div className="flex flex-wrap gap-4 mt-4 mb-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className={`py-1 px-4 border border-primary rounded-md cursor-pointer ${selectedCategory?._id === cat._id ? 'bg-primary text-white' : 'text-primary'}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <h1 className="font-medium text-sm">{cat.name}</h1>
            </div>
          ))}
        </div>):null}

        {products.length <= 4 || viewAll ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item, index) => (
              <Cardproduct key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex mx-3 relative group">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 5 },
                640: { slidesPerView: 4, spaceBetween: 15 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 25 },
                1280: { slidesPerView: 4, spaceBetween: 30 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".custom-next-cart",
                prevEl: ".custom-prev-cart",
              }}
              modules={[Pagination, Navigation, Autoplay]}
            >
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <Cardproduct item={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-prev-cart absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowBack size={25} />
            </button>
            <button className="custom-next-cart absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowForward size={25} />
            </button>
          </div>
        )}

        {products.length > 4 && (
          <button
            className="mx-auto text-[12px] lg:text-[16px] my-4 lg:my-8 px-6 py-2 bg-primary text-white flex justify-center items-center rounded-sm"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Xem ít hơn" : "Xem tất cả"}
          </button>
        )}
        <hr className="my-16" />
      </div>
    ) : null
  );
}

export default ProductsByCategory;
