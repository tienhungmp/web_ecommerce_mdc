import { useEffect, useState } from "react";
import Cardproduct from "../../cart/Cardproduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Countdown from "../../countdown/Countdown";
import { SummaryApi } from "../../../common";
import axios from "axios";

function SectionProducts({type, title, subtitle}) {
  const [viewAll, setViewAll] = useState(false);
  const [products, setProducts] = useState([]);
  
  const renderProduct = async () => {
    try {
      const dataResponse = await axios({
        url: `${SummaryApi.getAllProducts.url}?page=1&limit=100`,
        method: SummaryApi.getAllProducts.method,
        withCredentials: true,
        credentials: "include",
      });
      const dataApi = await dataResponse.data;
      setProducts(dataApi.products.filter((product) => product.tags.includes(type)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderProduct();
  }, []);

  return (
    <div className="mt-12 lg:mt-24">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">{subtitle}</span>
      </div>
      <div className="flex items-center gap-6 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-semibold text-gray-800 text-xl lg:text-4xl">
          {title}
        </span>
      </div>
      
      {/* Nếu số lượng sản phẩm <= 4, hiển thị dưới dạng grid */}
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
              nextEl: ".custom-next-cart",
              prevEl: ".custom-prev-cart",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className=""
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <Cardproduct item={item} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Button */}
          <button className="custom-prev-cart absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowBack size={25} />
          </button>
          <button className="custom-next-cart absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowForward size={25} />
          </button>
        </div>
      )}

      {/* Hiển thị nút Xem tất cả nếu số lượng sản phẩm > 4 */}
      {products.length > 4 && (
        <button
          className="mx-auto text-[12px] lg:text-[16px] my-4 lg:my-8 px-6 py-1 bg-primary text-white flex justify-center items-center rounded-sm"
          onClick={() => setViewAll(!viewAll)}
        >
          {viewAll ? "Xem ít hơn" : "Xem tất cả"}
        </button>
      )}
    </div>
  );
}

export default SectionProducts;
