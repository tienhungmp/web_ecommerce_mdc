import React, { useEffect, useState } from "react";
import axios from "axios";
import { SummaryApi } from "../../../common";
import Cardproduct from "../../cart/Cardproduct"; // Giả sử `Cardproduct` là component hiển thị sản phẩm
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function RelatedItem({ id }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const renderProduct = async (id) => {
    setLoading(true);
    try {
      const response = await axios({
        url: `${SummaryApi.getProductsByCategory.url.replace(":id", id)}?page=1&limit=12`,
        method: SummaryApi.getProductsByCategory.method,
        withCredentials: true,
      });
      setItems(response.data.products || []);
    } catch (error) {
      console.error("Error fetching related products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) renderProduct(id);
  }, [id]);

  return (
    <div className="related-items-section mt-10">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : items.length > 0 ? (
        items.length < 4 ? (
          // Hiển thị dưới dạng grid nếu sản phẩm ít hơn 4
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <Cardproduct key={index} item={item} />
            ))}
          </div>
        ) : (
          // Hiển thị dưới dạng slider nếu sản phẩm >= 4
          <div className="relative group">
            <Swiper
              spaceBetween={20}
              slidesPerView={4}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 10 },
                640: { slidesPerView: 3, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 20 },
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                nextEl: ".custom-next-related",
                prevEl: ".custom-prev-related",
              }}
              modules={[Pagination, Navigation, Autoplay]}
            >
              {items.map((item, index) => (
                <SwiperSlide key={index}>
                  <Cardproduct item={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation */}
            <button className="custom-prev-related absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowBack size={25} />
            </button>
            <button className="custom-next-related absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowForward size={25} />
            </button>
          </div>
        )
      ) : (
        <div className="text-center text-gray-500">No related products found.</div>
      )}
    </div>
  );
}

export default RelatedItem;
