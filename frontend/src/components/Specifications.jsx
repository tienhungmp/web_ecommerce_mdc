import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Specifications = ({ data }) => {
  
  const rawText = data;

  const specifications = rawText
    .split("\n") // Tách các dòng
    .map((line) => {
      const [key, value] = line.split("\t"); // Tách key và value
      return { key, value }; // Trả về đối tượng key-value
    });

  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  const displayedSpecifications = showAll
    ? specifications
    : specifications.slice(0, 6);

  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full table-auto border-collapse text-[13px]">
        <tbody>
          {displayedSpecifications.map((item, index) => (
            <tr key={index}>
              <td className="px-4 py-1 border">{item.key}</td>
              <td className="px-4 py-1 border">{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Nút Xem thêm */}
      {specifications.length > 6 && (
        <div className="text-center">
          <button onClick={toggleShowAll} className="text-primary text-sm">
            {showAll ? (
              <span className="flex items-center gap-2">
                Ẩn bớt <MdKeyboardArrowUp />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Xem thêm <MdKeyboardArrowDown />
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Specifications;
