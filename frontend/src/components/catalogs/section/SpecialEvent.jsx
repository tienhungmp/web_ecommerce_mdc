import React, { useEffect, useState } from "react";
import robothutbui from "../../../assets/images/robothutbui.png";
import { useNavigate } from "react-router-dom";
import { backendDomain, SummaryApi } from "../../../common";
import axios from "axios";

function SpecialEvent() {
  const navigate = useNavigate();
  const [newBanner, setNewBanner] = useState([]);

  const showBanner = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getBannerByCode.url.replace(":code", "special"),
        method: SummaryApi.getBannerByCode.method,
        withCredentials: true,
      });

      setNewBanner(response.data.data); // Assuming response.data.data is an array

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
    <div className="w-full bg-black flex flex-col lg:flex-row items-center p-1 lg:p-10 mt-20">
      {newBanner.length > 0 ? (
        newBanner.map((banner, index) => (
          <div key={index} className="w-full lg:w-2/5 flex flex-col justify-center p-4 gap-y-4">
             <h3 className="text-[#00FF66] font-semibold">Cực hot</h3>
            <p className="text-white text-[24px] lg:text-[48px] font-normal lg:font-semibold">
              {banner?.title}
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="capitalize mt-4 bg-[#00FF66] text-white p-2 text-[12px] lg:text-[16px] rounded-md w-20 md:w-44"
            >
              Mua ngay
            </button>
          </div>
        ))
      ) : (
        <div className="w-full lg:w-2/5 flex flex-col justify-center p-4 gap-y-4">
             <h3 className="text-[#00FF66] font-semibold">Cực hot</h3>
          <p className="text-white text-[20px] lg:text-[48px] font-normal lg:font-semibold">
            Sản phẩm đặc biệt Deebot Y1 Pro Plus Mới – Robot Hút Bụi Lau Nhà
          </p>
          {/* <Countdown targetDate={'2024-10-18T00:00:00'} /> */}
          <button
            onClick={() => navigate("/shop")}
            className="capitalize mt-4 bg-[#00FF66] text-white p-2 text-[12px] lg:text-[16px] rounded-md w-20 md:w-44"
          >
            Mua ngay
          </button>
        </div>
      )}

      <div className="w-full md:w-3/5 relative flex justify-center items-center">
        {newBanner.length > 0 ? (
          newBanner.map((banner, index) => (
            <img
              key={index}
              src={`${backendDomain}/${banner.imageUrl}`}
              alt={banner.title}
              className="object-cover h-4/6 relative z-10"
            />
          ))
        ) : (
          <img
            src={robothutbui}
            alt="Robot Hút Bụi Lau Nhà"
            className="object-cover z-10"
          />
        )}

        <div className="absolute w-full h-full rounded-full opacity-30 blur-xl z-0 bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[rgba(255,255,255)] to-[rgba(255,255,255,0.01)]"></div>
      </div>
    </div>
  );
}

export default SpecialEvent;
