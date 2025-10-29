import axios from "axios";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SummaryApi } from "../../common";

function CheckWarrantyCode() {
  const [code, setCode] = useState(""); // Lưu mã bảo hành nhập vào
  const [warranties, setWarranties] = useState([]); // Lưu dữ liệu bảo hành trả về

  // Hàm gọi API để kiểm tra mã bảo hành
  const getWarranty = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getWarrantyDate.url.replace(":code", code),
        method: SummaryApi.getWarrantyDate.method,
        withCredentials: true,
      });
      setWarranties(response.data.datesWarranty); // Lưu dữ liệu trả về
    } catch (error) {
      console.error("getWarranty", error);
    }
  };

  return (
    <div className="mx-8 mb-16">
      <h1 className="mb-6 font-medium text-sm">Kiểm tra mã bảo hành</h1>
      <div className="flex items-center gap-2">
        <div className="border relative rounded p-1 w-56 border-primary">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="code" className="bg-white text-gray-600 px-1">
              Mã bảo hành
            </label>
          </div>
          <input
            id="code"
            name="code"
            type="text"
            value={code} // Gắn giá trị state vào ô input
            onChange={(e) => setCode(e.target.value)} // Cập nhật mã bảo hành khi người dùng nhập
            className="py-1 text-xs px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>
        <button
          className="p-2 border rounded-md border-primary text-primary"
          onClick={getWarranty} // Gọi hàm getWarranty khi nhấn nút
        >
          <CiSearch />
        </button>
      </div>

      {/* Hiển thị thông tin bảo hành nếu có */}
      {warranties.length > 0 && (
        <div className="mt-4">
          <h2 className="font-medium text-sm">Thông tin bảo hành:</h2>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Mã bảo hành
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Tên bảo hành
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Thời gian bảo hành
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                  Ngày hết hạn
                </th>
              </tr>
            </thead>
            <tbody>
              {warranties?.map((warranty, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {warranty?.idWarranty}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {warranty?.name}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {warranty?.duration} {warranty?.durationUnit}
                  </td>
                  <td className="px-2 py-3 text-xs text-gray-700">
                    {warranty?.warrantyEndDate
                      ? new Date(warranty.warrantyEndDate).toLocaleString()
                      : "Không có dữ liệu"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CheckWarrantyCode;
