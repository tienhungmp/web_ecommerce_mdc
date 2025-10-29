import React, { useState } from "react";

const AddCategoryModal = ({ isOpen, onClose, onSave, categories }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState("");

  const handleSubmit = () => {
    onSave({ name, description, parentCategory:parentCategory || null });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-semibold mb-4">Thêm danh mục</h2>

        <div className="mb-4 grid grid-cols-3 gap-4">
          <div className="border col-span-2 focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <label htmlFor="category" className="bg-white text-gray-600 px-1">
                Tên danh mục
              </label>
            </div>
            <input
              id="category"
              name="category"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </div>
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <label className="bg-white text-gray-600 px-1">Danh mục cha</label>
            </div>
            <select
              value={parentCategory}  // Bind the selected parent category to state
              onChange={(e) => setParentCategory(e.target.value)} // Update state on selection
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            >
              <option value=''>
                -- Chọn danh mục cha --
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
              <label htmlFor="description" className="bg-white text-gray-600 px-1">
                Mô tả
              </label>
            </div>
            <textarea
              id="description"
              name="description"
              value={description}  // Bind value from state
              onChange={(e) => setDescription(e.target.value)}  // Update state on input change
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-sm"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-primary text-white rounded-sm"
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
