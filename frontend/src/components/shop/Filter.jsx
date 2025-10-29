import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const brands = [
    "Xiaomi",
    "Ecovacs",
    "Tineco",
    "Xiaomi-Redmi",
    "Lumias",
    "KingSmith",
    "Khác",
  ];

  const priceRanges = [
    { label: "Dưới 2 triệu", value: [0, 2000000] },
    { label: "2 - 5 triệu", value: [2000000, 5000000] },
    { label: "5 - 7 triệu", value: [5000000, 7000000] },
    { label: "7 - 10 triệu", value: [7000000, 10000000] },
    { label: "Trên 10 triệu", value: [10000000, Infinity] },
  ];

  const [selectedBrands, setSelectedBrands] = useState([]); // Brands selected by the user
  const [selectedPriceRange, setSelectedPriceRange] = useState(null); // Selected price range

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(selectedPriceRange === range ? null : range);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      company: selectedBrands,
      priceRange: selectedPriceRange ? selectedPriceRange : [],
    });
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedPriceRange(null);
    onFilterChange({ company: [], priceRange: [] });
  };

  return (
    <div className="p-4 rounded max-w-md">
      {/* Filter by Brand */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Thương hiệu</h3>
        <div className="text-xs">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-1 mb-2">
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)} // Check if the brand is selected
                onChange={() => handleBrandChange(brand)}
                className="accent-blue-500"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Chọn mức giá</h3>
        <div className="text-xs">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-1 mb-2">
              <input
                type="radio"
                name="priceRange"
                value={JSON.stringify(range.value)}
                checked={
                  selectedPriceRange &&
                  JSON.stringify(selectedPriceRange) ===
                    JSON.stringify(range.value)
                }
                onChange={() => handlePriceRangeChange(range.value)}
                className="accent-blue-500"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {/* Apply and Reset Filters */}
      <div className="flex gap-2">
        <button
          onClick={handleApplyFilters}
          className="border bg-primary text-white py-1 px-2 text-xs rounded"
        >
          Áp dụng
        </button>
        <button
          onClick={handleResetFilters}
          className="border border-primary text-primary py-1 px-2 text-xs rounded"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}

export default Filter;
