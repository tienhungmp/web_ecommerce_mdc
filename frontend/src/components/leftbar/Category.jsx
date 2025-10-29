import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function Category({ item, childCategories }) {
  const location = useLocation();
  const isActive = location.pathname === `/shop/${item?._id}`;

  // Lọc danh mục con thuộc danh mục cha hiện tại
  const filteredChildren = childCategories?.filter(
    (child) => child.parentCategory?._id === item._id
  );

  return (
    <li
      className={`relative px-4 py-1.5 capitalize group cursor-pointer shadow-sm shadow-transparent rounded-lg hover:shadow-primary ${
        isActive ? "shadow-primary" : ""
      }`}
    >
      <div className=" bg-white flex items-center justify-between">
        <Link
          to={`/shop/${item?._id}`}
          className={`flex items-center gap-3 group-hover:text-primary w-full ${
            isActive ? "text-primary" : "text-gray-800"
          }`}
        >
          {item.name}
        </Link>
        {filteredChildren && filteredChildren.length > 0 && (
          <span className="cursor-pointer text-gray-600">
            <IoIosArrowForward />
          </span>
        )}
      </div>

      {/* Danh mục con hiển thị khi hover */}
      {filteredChildren && filteredChildren.length > 0 && (
        <ul className="absolute z-40 left-full top-0 w-full bg-white border rounded shadow-lg group-hover:block hidden">
          {filteredChildren.map((child) => (
            <li
              key={child._id}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
            >
              <Link to={`/shop/${child._id}`}>{child.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default Category;
