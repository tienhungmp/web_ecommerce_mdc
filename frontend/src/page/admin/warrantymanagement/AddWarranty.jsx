import React from "react";

function AddWarranty({ formData, warrantyTypes, durationUnits, onChange, onSubmit }) {
  const renderInput = (label, name, type = "text", isRequired = false) => (
    <div className="relative col-span-2">
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={isRequired}
        value={formData[name]}
        onChange={onChange}
        className="w-full border rounded px-2 py-1 text-sm outline-none"
      />
    </div>
  );

  const renderSelect = (label, name, options) => (
    <div className="relative col-span-2">
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={onChange}
        className="w-full border rounded px-2 py-1 text-sm outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const renderTextarea = (label, name, rows = 2) => (
    <div className="relative col-span-5">
      <label
        htmlFor={name}
        className="absolute -top-2 left-2 text-xs bg-white px-1 text-gray-600"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={formData[name]}
        onChange={onChange}
        className="w-full border rounded px-2 py-1 text-sm outline-none"
      />
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 border rounded grid grid-cols-10 gap-3"
    >
      {renderInput("Tên", "name", "text", true)}
      {renderSelect("Loại bảo hành", "warrantyType", warrantyTypes)}
      {renderInput("Thời gian", "duration", "number", true)}
      {renderSelect("Đơn vị", "durationUnit", durationUnits)}
      {renderInput("Phạm vi", "coverage", "text", true)}
      {renderTextarea("Mô tả", "description")}
      {renderTextarea("Điều khoản", "terms")}

      <button
        type="submit"
        className="px-2 py-1 col-span-2 bg-white text-primary border border-primary rounded hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary-light transition"
      >
        Lưu mã
      </button>
    </form>
  );
}

export default AddWarranty;
