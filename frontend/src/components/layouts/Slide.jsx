import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/swiper-bundle.css";
import "swiper/css/navigation"; // Ensure navigation CSS is loaded
import { banner } from "../../constants/slide";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"; // Import custom icons
import "./slide.css";
import { backendDomain, SummaryApi } from "../../common";
import axios from "axios";
import { useEffect, useState } from "react";

function Slide() {
  const [newBanner, setNewBanner] = useState([]);

  const showBanner = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getBannerByCode.url.replace(":code", "slide"),
        method: SummaryApi.getBannerByCode.method,
        withCredentials: true,
      });

      setNewBanner(response.data.data);

      // Log the banner data
      console.log("Fetched Banner Data:", response.data.data);
    } catch (error) {
      console.log("Error fetching banner data:", error);
    }
  };

  // Call showBanner when component mounts
  useEffect(() => {
    showBanner();
  }, []);
  return (
    <div className="relative flex items-center justify-center pt-8 lg:pt-6 lg:mx-0 w-full lg:w-4/5 group">
      {newBanner.length > 0 ? (
        <>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next", // Link to custom next button
              prevEl: ".custom-prev", // Link to custom previous button
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Autoplay delay in milliseconds
              disableOnInteraction: false, // Keep autoplay active after interaction
            }}
            modules={[Pagination, Navigation, Autoplay]} // Add Swiper modules
            className="h-[160px] lg:h-[385px] w-full"
          >
            {newBanner.map((item, index) => (
              <SwiperSlide key={index} className="h-[160px] lg:h-[385px]">
                <img
                  src={`${backendDomain}/${item?.imageUrl}`}
                  alt={item?._id}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="custom-prev absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowBack size={25} />
          </button>
          <button className="custom-next absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowForward size={25} />
          </button>
        </>
      ) : (
        <>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next", // Link to custom next button
              prevEl: ".custom-prev", // Link to custom previous button
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000, // Autoplay delay in milliseconds
              disableOnInteraction: false, // Keep autoplay active after interaction
            }}
            modules={[Pagination, Navigation, Autoplay]} // Add Swiper modules
            className="h-[160px] lg:h-[385px] w-full"
          >
            {banner.map((item, index) => (
              <SwiperSlide key={index} className="h-[160px] lg:h-[385px]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="custom-prev absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-r-full left-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowBack size={25} />
          </button>
          <button className="custom-next absolute top-1/2 transform -translate-y-1/2 text-white bg-[rgba(36,36,36,0.3)] rounded-l-full right-0 h-[60px] w-[30px] z-10 hidden lg:group-hover:flex items-center justify-center">
            <IoIosArrowForward size={25} />
          </button>
        </>
      )}
    </div>
  );
}

export default Slide;
