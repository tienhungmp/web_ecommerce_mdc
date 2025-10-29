import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import Cardproduct from "../components/cart/Cardproduct";
import products from "../constants/products";
import CardWishlist from "../components/cart/CardWishlist";

function Wishlist() {
  const [viewAllWishlist, setViewAllWishlist] = useState(false);
  const [viewJustForYou, setJustForYou] = useState(false);
  return (
    <div className="max-w-screen-xl mx-auto px-2">
      <div className="flex justify-between items-center my-6 lg:my-10">
        <h1 className="text-base lg:text-lg">Wishlist ({products.length})</h1>
        <button className="text-sm lg:text-base flex justify-center items-center px-6 py-2 text-[12px] lg:text-[16px] border border-primary text-primary">
          Movie all to bag
        </button>
      </div>
      {viewAllWishlist ? (
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
            navigation={{
              nextEl: ".custom-next-cart",
              prevEl: ".custom-prev-cart",
            }}
            modules={[Pagination, Navigation]}
            className=""
          >
            {products.map((item, index) => (
              <SwiperSlide key={index}>
                <CardWishlist item={item} />
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

      <button
        className="text-[12px] lg:text-[16px] my-4 lg:my-8 px-6 py-2 bg-primary text-white flex justify-center items-center rounded-sm mx-auto"
        onClick={() => setViewAllWishlist(!viewAllWishlist)}
      >
        {viewAllWishlist ? "Xem ít hơn" : "Xem tất cả"}
      </button>
      <hr className="my-16" />

      <div className="mt-12 lg:mt-24 relative mb-10">
        <div className="flex items-center justify-between mb-6 lg:mb-10">
          <div className="flex items-center gap-4">
          <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
          <span className="text-primary font-bold text-lg">Just For You</span>
          </div>
          <div>
            <button
              className="text-sm lg:text-base flex justify-center items-center px-6 py-2 text-[12px] lg:text-[16px] border border-primary text-primary"
              onClick={() => setJustForYou(!viewJustForYou)}
            >
              {viewJustForYou ? "See less" : "See all"}
            </button>
          </div>
        </div>
        {viewJustForYou ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((item, index) => (
              <Cardproduct key={index} item={item} /> // Render sản phẩm từ mảng
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
              navigation={{
                nextEl: ".custom-next-selling",
                prevEl: ".custom-prev-selling",
              }}
              modules={[Pagination, Navigation]}
            >
              {products.map((item, index) => (
                <SwiperSlide key={index}>
                  <Cardproduct item={item} /> {/* Render sản phẩm từ mảng */}
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-prev-selling absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowBack size={25} />
            </button>

            <button className="custom-next-selling absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
              <IoIosArrowForward size={25} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
