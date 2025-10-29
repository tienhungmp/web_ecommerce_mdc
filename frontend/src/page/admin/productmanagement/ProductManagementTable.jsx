import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import noimages from "../../../assets/images/noimages.jpg";
import { NavLink } from "react-router-dom";
import { backendDomain } from "../../../common";

const ProductManagementTable = ({ products, categories, onRemoveProduct }) => {
  const tagColors = {
    flashsale: "text-red-500",
    outstanding: "text-blue-500",
    new: "text-green-500",
    promotion: "text-yellow-500",
  };

  return (
    <div className="-my-2 py-1 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-2 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-left leading-4 text-primary tracking-wider">
                Hình ảnh
              </th>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Giá
              </th>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Danh mục
              </th>

              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Công ty
              </th>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Kho
              </th>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-center text-sm leading-4 text-primary tracking-wider">
                Thẻ
              </th>
              <th className="px-4 py-2 border-b font-semibold border-gray-500 text-center text-sm leading-4 text-primary tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products?.map((product) => (
              <tr key={product?._id}>
                <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-500">
                  <img
                    src={
                      product.images
                        ? `${backendDomain}${product.avatar}`
                        : noimages
                    }
                    alt={product?.name}
                    className="w-8 h-8 object-cover"
                  />
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {product?.name}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {product?.saleprice ? (
                    <div className="flex flex-col">
                      <span>{product?.saleprice?.toLocaleString()} VND</span>
                      <span className="line-through text-xs italic text-gray-500">
                        {product?.price?.toLocaleString()} VND
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span> {product?.price?.toLocaleString()} VND</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {categories?.find((cat) => cat._id === product.subCategory)
                    ? `-- ${
                        categories.find(
                          (cat) => cat._id === product.subCategory
                        )?.name
                      }`
                    : categories?.find(
                        (cat) => cat._id === product.mainCategory
                      )?.name || "Trống"}
                </td>

                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {product.company || "N/A"}
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {product?.inventory || 0}
                </td>
                <td className="px-6 py-2 border-b text-blue-900 border-gray-500 text-sm leading-5 text-center">
                  <div className="mr-2">{product?.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`col-span-1 rounded-lg text-[10px] ${
                        tagColors[tag] || "bg-gray-300"
                      }`}
                    >
                      {tag === "flashsale"
                    ? "Khuyến mãi nhanh, "
                    : tag === "outstanding"
                    ? "Nổi bật, "
                    : tag === "promotion"
                    ? "Khuyến mãi, "
                    : "Mới, "}
                    </span>
                  ))}</div>
                </td>
                <td className="px-6 py-2 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <div className="flex items-center gap-4 justify-center">
                    <NavLink
                      className="text-blue-500 hover:text-blue-700"
                      to={product._id} // Trigger the onEdit function passed from the parent
                    >
                      <FaRegEdit size={18} />
                    </NavLink>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onRemoveProduct(product._id)}
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagementTable;
