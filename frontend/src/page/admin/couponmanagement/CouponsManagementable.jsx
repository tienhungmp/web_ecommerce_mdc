import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { NavLink } from "react-router-dom";

function CouponsManagementable({ coupons, onDelete }) {
  console.log("Coupons:", coupons);
  return (
    <div className="my-4 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle inline-block min-w-full border shadow overflow-hidden bg-white shadow-md px-8 py-2 rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <td className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Mã
              </td>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Thể loại
              </th>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Giảm giá
              </th>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Từ ngày
              </th>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Đến ngày
              </th>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Trạng thái
              </th>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-left text-sm leading-4 text-primary tracking-wider">
                Mô tả
              </th>
              <th className="px-4 py-2 border-b font-medium border-gray-500 text-center text-sm leading-4 text-primary tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon?._id}>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.name}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.discountType}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.value}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.validFrom
                    ? new Date(coupon.validFrom).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.validFrom
                    ? new Date(coupon.validFrom).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.isActive ? (
                    <span className="px-2 rounded-md text-green-600 bg-green-400">
                      Active
                    </span>
                  ) : (
                    <span className="px-2 rounded-md text-red-600 bg-red-300">
                      Deactive
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  {coupon?.description}
                </td>
                <td className="px-4 py-2 border-b font-normal border-gray-300 text-left text-xs leading-4 text-gray-800 tracking-wider">
                  <div className="flex items-center justify-center gap-4">
                    <NavLink
                      to={coupon?._id}
                      className="text-primary hover:text-indigo-500"
                    >
                      <FaRegEdit size={20} />
                    </NavLink>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(coupon?._id)}
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
}

export default CouponsManagementable;
