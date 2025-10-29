import img1 from "../../assets/images/logo-olivo-1024x477-1.png";
import img2 from "../../assets/images/mijia-logo.png";
import img3 from "../../assets/images/deerma-1.jpg";
import img4 from "../../assets/images/logo_xiaomi-01-768x550.jpg";
import img5 from "../../assets/images/Redmi_Logo.svg-2048x590.png";
import img6 from "../../assets/images/roborock-300x96.png";
import img7 from "../../assets/images/dreame.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function Brands() {
  const images = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="hidden lg:flex items-center justify-between">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={{ width: "120px" }}
            />
          ))}
        </div>
        <div className="flex lg:hidden mx-3 relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            navigation={{
              nextEl: ".custom-next-brands",
              prevEl: ".custom-prev-brands",
            }}
            modules={[Pagination, Navigation]}
            className=""
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="h-16 flex items-center">
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{ width: "100px" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="custom-prev-brands absolute text-black bg-transparent rounded-full left-0 top-1/2 translate-y-[-50%] h-[30px] w-[30px] z-10 flex items-center justify-center">
            <IoIosArrowRoundBack size={25} className="hover:text-primary" />
          </button>
          <button className="custom-next-brands absolute text-black bg-transparent rounded-full right-0 top-1/2 translate-y-[-50%] h-[30px] w-[30px] z-10 flex items-center justify-center">
            <IoIosArrowRoundForward size={25} className="hover:text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Brands;
