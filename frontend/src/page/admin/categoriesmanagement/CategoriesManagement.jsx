import React, { useCallback, useEffect, useState } from "react";
import { SummaryApi } from "../../../common";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import LoadingPage from "../../../components/loading/LoadingPage";
import { IoAdd } from "react-icons/io5";
import AddCategoryModal from "./AddCategoryModal";

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: SummaryApi.getAllCategories.url,
        method: SummaryApi.getAllCategories.method,
        withCredentials: true,
      });

      const allCategories = response.data.categories;
      setCategories(allCategories);

      const rootCategories = allCategories.filter(
        (category) => category.parentCategory === null
      );

      rootCategories.forEach((rootCategory) => {
        rootCategory.children = allCategories.filter(
          (category) => category.parentCategory?._id === rootCategory._id
        );
      });
      console.log("parent", parentCategories);

      setParentCategory(rootCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Không thể tải danh mục.");
    } finally {
      setTimeout(()=>setLoading(false),800)
    }
  }, []);

  // Add new category
  const addCategory = async (categoryData) => {
    try {
      const dataResponse = await axios({
        url: SummaryApi.addCategory.url,
        method: SummaryApi.addCategory.method,
        data: categoryData,
        withCredentials: true,
      });
  
      const newCategory = dataResponse.data.category;
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, newCategory];
  
        // Cập nhật parentCategories từ updatedCategories
        const updatedParentCategories = updatedCategories
          .filter((category) => category.parentCategory === null)
          .map((rootCategory) => ({
            ...rootCategory,
            children: updatedCategories.filter(
              (category) => category.parentCategory?._id === rootCategory._id
            ),
          }));
  
        setParentCategory(updatedParentCategories);
  
        return updatedCategories;
      });
  
      alert("Thêm danh mục thành công!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Lỗi khi thêm danh mục.");
    }finally{
      window.location.reload();
    }
  };
  

  // Delete category
  const deleteCategory = async (categoryId) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này không?")) return;
    const url = SummaryApi.deleteCategory.url.replace(":id", categoryId);
    try {
      await axios({
        url: url,
        method: SummaryApi.deleteCategory.method,
        withCredentials: true,
      });

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== categoryId)
      );
      alert("Xóa danh mục thành công!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Lỗi khi xóa danh mục.");
    }finally{
      window.location.reload();
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (loading) {
    return <LoadingPage />;
  }

  const renderActions = (categoryId) => (
    <>
      <NavLink to={categoryId} className="text-primary hover:text-indigo-500">
        <FaRegEdit size={20} />
      </NavLink>
      <button
        onClick={() => deleteCategory(categoryId)}
        className="ml-4 text-red-600 hover:text-red-800"
      >
        <MdDeleteForever size={20} />
      </button>
    </>
  );

  // Render a single category row (including children)
  const CategoryRow = ({ category, isChild }) => (
    <>
      <tr className={`${isChild ? "" : "border-t border-gray-400"}`}>
        <td
          className={`px-4 py-2 whitespace-nowrap text-sm ${
            isChild ? "pl-6" : "font-medium text-gray-900"
          }`}
        >
          {isChild ? "-- " : ""}
          {category.name}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
          {category.description}
        </td>
        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
          {new Date(category.createdAt).toLocaleString()}
        </td>
        <td className="flex items-center px-4 py-2 whitespace-nowrap text-sm font-medium">
          {renderActions(category._id)}
        </td>
      </tr>
      {category.children &&
        category.children.map((child) => (
          <CategoryRow key={child._id} category={child} isChild={true} />
        ))}
    </>
  );

  return (
    <div>
      <h1 className="text-2xl font-medium my-4">Quản lý danh mục</h1>
      <div>
        <button
          className="px-6 py-1 my-4 bg-primary text-xs text-white flex justify-center items-center rounded-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <IoAdd size={20} />
          <span>Thêm danh mục</span>
        </button>
      </div>
      <div className="-my-2 py-1 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-400 text-left leading-4 text-primary tracking-wider font-semibold">
                  Tên danh mục
                </th>
                <th className="px-4 py-2 border-b border-gray-400 text-left leading-4 text-primary tracking-wider font-semibold">
                  Mô tả
                </th>
                <th className="px-4 py-2 border-b border-gray-400 text-left leading-4 text-primary tracking-wider font-semibold">
                  Ngày tạo
                </th>
                <th className="px-4 py-2 border-b border-gray-400 text-left leading-4 text-primary tracking-wider font-semibold">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {parentCategories.map((parent) => (
                <CategoryRow key={parent._id} category={parent} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addCategory}
        categories={parentCategories}
      />
    </div>
  );
};

export default CategoriesManagement;
