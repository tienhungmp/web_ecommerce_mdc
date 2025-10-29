import React from "react";
const translateDurationUnit = (unit) => {
  const unitMap = {
    months: 'tháng',
    years: 'năm',
    days: 'ngày',
    hours: 'giờ',
  };
  return unitMap[unit] || unit;
};


function WarrantyManagementTable({ warranties, onEdit, onDelete }) {
  return (
    <div className="p-4 border rounded my-4">
      {warranties.length === 0 ? (
        <p className="text-gray-500 text-sm">Không có dữ liệu hiển thị.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300 text-xs text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Tên</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Mô tả</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Thể loại</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Thời gian</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Phạm vi</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Điều khoản</th>
              <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {warranties.map((warranty) => (
              <tr key={warranty._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">{warranty.name}</td>
                <td className="border border-gray-300 px-2 py-1">{warranty.description}</td>
                <td className="border border-gray-300 px-2 py-1">{warranty.warrantyType}</td>
                <td className="border border-gray-300 px-2 py-1 whitespace-nowrap">
                {warranty.duration} {translateDurationUnit(warranty.durationUnit)}
                </td>
                <td className="border border-gray-300 px-2 py-1">{warranty.coverage}</td>
                <td className="border border-gray-300 px-2 py-1">{warranty.terms}</td>
                <td className="border border-gray-300 px-2 py-1 space-x-2 whitespace-nowrap">
                  <button
                    onClick={() => onEdit(warranty)}
                    className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 text-xs"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => onDelete(warranty._id)}
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WarrantyManagementTable;
