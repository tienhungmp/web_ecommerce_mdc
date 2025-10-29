import React, { useEffect, useState } from "react";
import Flashsales from "./section/Flashsales";
import Catagory from "./section/Catagory";
import BestSelling from "./section/BestSelling";
import SpecialEvent from "./section/SpecialEvent";
import ExploreOurProducts from "./section/ExploreOurProducts";
import NewArrival from "./section/NewArrival";
import Service from "./section/Service";
import SectionProducts from "./section/SectionProducts";
import { SummaryApi } from "../../common";
import axios from "axios";
import ProductsByCategory from "./section/ProductsByCategory";
import Brands from "../../assets/images/Brands";

function Catalog() {
   const [categories, setCategories] = useState([]); // Danh mục sản phẩm
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
      console.log("rootCategories",rootCategories);
      
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(()=>{
    getCategories();
  },[])
  return (
    <div className="max-w-screen-xl mx-auto ">
      <Flashsales />
      <hr className="my-16" />
      {categories.map((category)=> <ProductsByCategory key={category._id} category={category} />)}
      {/* <ExploreOurProducts type={"Robot Hút Bụi"}/>
      <hr className="my-16" />
      <ExploreOurProducts type={"Máy lọc không khí"}/> */}
      {/* <hr className="my-16" /> */}
      <SpecialEvent/>
      <hr className="my-16" />
      <SectionProducts type={"new"} title={"Sản phẩm mới nhất"} subtitle={"New Arrivals!"}/>
      <hr className="my-16" />
      <SectionProducts type={"promotion"} title={"khuyến mãi kịch sàn"} subtitle={"Hot Deals!"}/>
      <hr className="my-16" />
      <SectionProducts type={"outstanding"} title={"Dành cho bạn"} subtitle={"Trending Now!"}/>
      {/* <BestSelling /> */}
      {/* <ExploreOurProducts/> */}
      <NewArrival/>
      <Service/>
      <Brands/>
    </div>
  );
}

export default Catalog;
