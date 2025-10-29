import React from "react";
import CardCategory from "../../cart/CardCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; 
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward, IoIosCamera, IoIosLaptop, IoIosPhonePortrait, IoMdTabletPortrait } from "react-icons/io";
import { PiGearThin, PiHeadphonesThin, PiWatchThin } from "react-icons/pi";
import { SiYoutubegaming } from "react-icons/si";

function Catagory() {
  const categories = [
    { name: "Iphone", icon: <IoIosPhonePortrait /> },
    { name: "Laptop", icon: <IoIosLaptop /> },
    { name: "Camera", icon: <IoIosCamera /> },
    { name: "Headphones", icon: <PiHeadphonesThin /> },
    { name: "Gaming", icon: <SiYoutubegaming /> },
    { name: "Smartwatch", icon: <PiWatchThin /> },
    { name: "Tablet", icon: <IoMdTabletPortrait /> },
    { name: "Accessories", icon: <PiGearThin /> },
  ];

  return (
    <div className="mt-12 lg:mt-24">
      <div className="flex items-center gap-4">
        <span className="inline-block w-5 h-11 rounded-md border bg-primary"></span>
        <span className="text-primary font-bold text-lg">Danh mục</span>
      </div>
      <div className="flex items-center gap-10 lg:gap-32 mt-5 mb-8">
        <span className="capitalize font-bold text-xl lg:text-4xl">
          Danh mục nổi bật
        </span>
      </div>
      <div className="flex mx-3 relative">
        <Swiper
          spaceBetween={20}
          slidesPerView={6}
          breakpoints={{
            320: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          navigation={{
            nextEl: ".custom-next-category",
            prevEl: ".custom-prev-category",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className=""
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <CardCategory name={category.name} icon={category.icon} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-prev-category absolute -top-[4rem] text-black bg-[#f5f5f5] rounded-full right-14 h-[46px] w-[46px] z-10 flex items-center justify-center">
        <IoIosArrowRoundBack size={25} />
        </button>
        <button className="custom-next-category absolute -top-[4rem] text-black bg-[#f5f5f5] rounded-full right-0 h-[46px] w-[46px] z-10 flex items-center justify-center">
        <IoIosArrowRoundForward size={25} />
        </button>
      </div>
    </div>
  );
}

export default Catagory;
