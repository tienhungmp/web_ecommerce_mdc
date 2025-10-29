import React, { useState, useEffect } from "react";
import Cardproduct from "../../cart/Cardproduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import axios from "axios"; // Đảm bảo import axios
import { SummaryApi } from "../../../common"; // Đảm bảo api path chính xác

function BestSelling() {
  const [viewAll, setViewAll] = useState(false);
  const [products, setProducts] = useState([]);

  // Lấy sản phẩm từ API
  const renderProduct = async () => {
    try {
      const dataResponse = await axios({
        url: `${SummaryApi.getAllProducts.url}?page=1&limit=100`,
        method: SummaryApi.getAllProducts.method,
        withCredentials: true,
      });
      const allProducts = dataResponse.data.products;
  
      // Sắp xếp sản phẩm theo `sold` giảm dần
      const topProducts = allProducts
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 12); // Lấy ra 12 sản phẩm đầu tiên
  
      setProducts(topProducts); // Lưu sản phẩm vào state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  // Fetch sản phẩm khi component mount
  useEffect(() => {
    renderProduct();
  }, []);

  // Kiểm tra nếu số lượng sản phẩm ít hơn 4
  const shouldUseSwiper = products.length >= 4;

  return (
    <div className="mt-12 lg:mt-24 relative">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">Tháng này</span>
      </div>
      <div className="flex items-center gap-10 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-bold text-xl lg:text-4xl">
          Sản phẩm bán chạy
        </span>
      </div>

      {viewAll ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <Cardproduct key={index} item={item} />
          ))}
        </div>
      ) : shouldUseSwiper ? (
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
              nextEl: ".custom-next-selling",
              prevEl: ".custom-prev-selling",
            }}
            modules={[Pagination, Navigation, Autoplay]}
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <Cardproduct item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Chỉ hiển thị nút điều hướng nếu có ít nhất 4 sản phẩm */}
          {shouldUseSwiper && (
            <>
              <button className="custom-prev-selling absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
                <IoIosArrowBack size={25} />
              </button>

              <button className="custom-next-selling absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
                <IoIosArrowForward size={25} />
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item, index) => (
            <Cardproduct key={index} item={item} />
          ))}
        </div>
      )}

      {/* Ẩn nút "Xem tất cả" khi sản phẩm ít hơn 4 */}
      {shouldUseSwiper && (
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

export default BestSelling;
