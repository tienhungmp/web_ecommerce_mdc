import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SummaryApi } from "../../../common";
import axios from "axios";

const EditCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentCategory, setParentCategory] = useState(""); // Lưu _id danh mục cha
  const [categories, setCategories] = useState([]); // Danh sách tất cả danh mục
  const [originalData, setOriginalData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch categories from API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
      });
      const rootCategories = response.data.categories.filter(
        (category) => category.parentCategory === null
      );
      setCategories(rootCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  // Fetch category data by ID
  const fetchCategoryById = useCallback(async (categoryId) => {
    try {
      const url = SummaryApi.getCategoriesById.url.replace(":id", categoryId);
      const dataResponse = await axios({
        url: url,
        method: SummaryApi.getCategoriesById.method,
        withCredentials: true,
      });
      const dataApi = dataResponse.data.category;

      setName(dataApi.name || "");
      setDescription(dataApi.description || "");
      setParentCategory(dataApi.parentCategory?._id || ""); // Lưu _id danh mục cha
      setOriginalData({
        name: dataApi.name || "",
        description: dataApi.description || "",
        parentCategory: dataApi.parentCategory?._id || "",
      });
    } catch (error) {
      console.error("Error fetching category by ID:", error);
    }
  }, []);

  // Handle save button
  const handleSave = async () => {
    if (
      name === originalData.name &&
      description === originalData.description &&
      parentCategory === originalData.parentCategory
    ) {
      alert("Không có thay đổi nào để cập nhật.");
      return;
    }

    try {
      const url = SummaryApi.updateCategoryById.url.replace(":id", id);
      await axios({
        url: url,
        method: SummaryApi.updateCategoryById.method,
        data: { name, description, parentCategory },
        withCredentials: true,
      });

      alert("Cập nhật danh mục thành công!");
      navigate(-1); // Quay lại trang trước
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      alert("Cập nhật danh mục thất bại!");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCategories();
    fetchCategoryById(id);
  }, [id, fetchCategories, fetchCategoryById]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Chỉnh sửa danh mục</h1>
      <div className="mb-4">
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
              value={parentCategory}
              onChange={(e) => setParentCategory(e.target.value)}
              className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
            >
              <option value="">-- Chọn danh mục cha --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="border focus-within:border-primary focus-within:text-primary transition-all duration-500 relative rounded p-1">
          <div className="-mt-4 absolute tracking-wider px-1 capitalize text-xs">
            <label htmlFor="description" className="bg-white text-gray-600 px-1">
              Mô tả
            </label>
          </div>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => navigate(-1)}>
          Quay lại
        </button>
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={handleSave}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
