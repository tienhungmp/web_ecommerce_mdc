import { useState } from "react";
import BrandSlide from "./BrandSlide";
import ProductSpecial from "./ProductSpecial";
import Slider from "./Slider";

function BannerManagement() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("slider");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Quản lý banner</h1>
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("slider")}
          className={`py-2 px-4 text-lg font-semibold ${activeTab === "slider" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
        >
          Slider
        </button>
        <button
          onClick={() => setActiveTab("special")}
          className={`py-2 px-4 text-lg font-semibold ${activeTab === "special" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
        >
          Sản phẩm đặc biệt
        </button>
        <button
          onClick={() => setActiveTab("brand")}
          className={`py-2 px-4 text-lg font-semibold ${activeTab === "brand" ? "text-primary border-b-2 border-primary" : "text-gray-600"}`}
        >
          Sản phẩm giới thiệu
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "slider" && <Slider />}
      {activeTab === "special" && <ProductSpecial />}
      {activeTab === "brand" && <BrandSlide />}
    </div>
  );
}

export default BannerManagement;
