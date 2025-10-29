import { useRef, useEffect } from "react";
import Category from "../leftbar/Category";

function Sidebar({ categories, childCategories }) {

  return (
    <ul className="text-[12px] lg:text-[15px] relative">
      {categories.map((item) => (
        <Category
          key={item._id}
          item={item}
          childCategories={childCategories}
        />
      ))}
    </ul>
  );
}

export default Sidebar;
