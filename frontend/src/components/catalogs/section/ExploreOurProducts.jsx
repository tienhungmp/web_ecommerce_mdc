import React, { useEffect, useState } from "react";
import Cardproduct from "../../cart/Cardproduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { SummaryApi } from "../../../common";
import axios from "axios";

function ExploreOurProducts({ type }) {
  const [viewAll, setViewAll] = useState(false);
  const [items, setItems] = useState([]); // Danh sách sản phẩm
  const [categories, setCategories] = useState([]); // Danh mục sản phẩm

  // Lấy danh sách danh mục
  const getCategories = async () => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
      });
      const dataApi = dataResponse.data;
      const rootCategories = dataApi.categories.filter(
        (category) => category.parentCategory === null
      );
      setCategories(rootCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const renderProduct = async () => {
    try {
      const dataResponse = await axios({
        url: `${SummaryApi.getAllProducts.url}?page=1&limit=100`, // Lấy tối đa 100 sản phẩm (hoặc số lượng tùy backend)
        method: SummaryApi.getAllProducts.method,
        withCredentials: true,
      });
      const dataApi = await dataResponse.data;
  
      if (type) {
        // Tìm danh mục theo `type`
        const selectedCategory = categories.find(
          (category) => category.name.toLowerCase() === type.toLowerCase()
        );
  
        if (selectedCategory) {
          // Lọc sản phẩm thuộc danh mục
          const filteredProducts = dataApi.products.filter(
            (product) => product.mainCategory === selectedCategory._id
          );
          setItems(filteredProducts);
        } else {
          console.warn("No category found for type:", type);
          setItems([]); // Không có sản phẩm
        }
      } else {
        // Sắp xếp sản phẩm theo `createdAt` giảm dần và lấy 12 sản phẩm đầu tiên
        const latestProducts = dataApi.products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 12);
  
        setItems(latestProducts); // Hiển thị 12 sản phẩm mới nhất
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  // Gọi API danh mục khi component được mount
  useEffect(() => {
    getCategories();
  }, []);

  // Gọi API sản phẩm khi danh mục hoặc `type` thay đổi
  useEffect(() => {
    if (categories.length > 0) {
      renderProduct();
    }
  }, [categories, type]);

  return (
    <div className="relative lg:mt-24 mt-20">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">Sản phẩm nổi bật</span>
      </div>
      <div className="flex items-center gap-10 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-semibold text-xl lg:text-4xl">
          {type || "Khám phá sản phẩm"}
        </span>
      </div>

      {viewAll ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Cardproduct key={index} item={item} />
          ))}
        </div>
      ) : (
        <div>
          {items.length < 4 ? (
            // Hiển thị danh sách sản phẩm nếu ít hơn 4
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map((item, index) => (
                <Cardproduct key={index} item={item} />
              ))}
            </div>
          ) : (
            // Hiển thị slider nếu sản phẩm >= 4
            <div className="flex mx-3 relative group">
              <Swiper
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                  },
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                  },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".custom-next-explore",
                  prevEl: ".custom-prev-explore",
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className=""
              >
                {items.map((item, index) => (
                  <SwiperSlide key={index}>
                    <Cardproduct item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="custom-prev-explore absolute -top-[4rem] text-black bg-[#f5f5f5] rounded-full right-14 h-[46px] w-[46px] z-10 flex items-center justify-center">
                <IoIosArrowRoundBack size={25} />
              </button>
              <button className="custom-next-explore absolute -top-[4rem] text-black bg-[#f5f5f5] rounded-full right-0 h-[46px] w-[46px] z-10 flex items-center justify-center">
                <IoIosArrowRoundForward size={25} />
              </button>
            </div>
          )}
        </div>
      )}

      {items.length >= 4 && (
        <div className="flex justify-center text-[12px] lg:text-[16px] my-4 lg:my-8">
          <button
            className="px-6 py-2 bg-primary text-white flex justify-center items-center rounded-sm"
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Xem ít hơn" : "Xem tất cả"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ExploreOurProducts;
