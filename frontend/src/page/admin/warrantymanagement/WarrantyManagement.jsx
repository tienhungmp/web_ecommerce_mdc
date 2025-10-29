import React, { useEffect, useState } from "react";
import AddWarranty from "./AddWarranty";
import axios from "axios";
import { SummaryApi } from "../../../common";
import WarrantyManagementTable from "./WarrantyManagementTable";
import EditWarrantyModal from "./EditWarrantyModal";

function WarrantyManagement() {
  const [warranties, setWarranties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    warrantyType: "Standard",
    duration: "",
    durationUnit: "năm",
    coverage: "Sửa",
    terms: "",
  });

  const warrantyTypes = [
    "Standard",
    "Extended",
    "VIP",
    "Comprehensive",
    "Partial",
  ];
  const durationUnits = ["tháng", "năm", "Ngày", "giờ"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: SummaryApi.addNewWarranty.url,
        method: SummaryApi.addNewWarranty.method,
        data: formData,
        withCredentials: true,
      });

      alert("Warranty added successfully!");
      getAllWarranty();
    } catch (error) {
      console.error("Error adding Warranty:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const getAllWarranty = async () => {
    try {
      const response = await axios({
        url: SummaryApi.getAllWarranty.url,
        method: SummaryApi.getAllWarranty.method,
        withCredentials: true,
      });
      setWarranties(response.data.warranties);
    } catch (error) {
      console.error("Error fetching warranties:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
      if (!confirmDelete) return;

      const response = await axios({
        url: `${SummaryApi.deleteWarranty.url}/${id}`,
        method: SummaryApi.deleteWarranty.method,
        withCredentials: true,
      });

      alert("Xóa thành công!");
      getAllWarranty();
    } catch (error) {
      console.error("Error deleting warranty:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  const handleEdit = (warranty) => {
    setSelectedWarranty(warranty);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWarranty(null);
  };

  const handleSave = async(updatedWarranty,id) => {
    const hasChanges =
      updatedWarranty.name !== selectedWarranty.name ||
      updatedWarranty.description !== selectedWarranty.description ||
      updatedWarranty.warrantyType !== selectedWarranty.warrantyType ||
      updatedWarranty.duration !== selectedWarranty.duration ||
      updatedWarranty.durationUnit !== selectedWarranty.durationUnit ||
      updatedWarranty.coverage !== selectedWarranty.coverage ||
      updatedWarranty.terms !== selectedWarranty.terms;
  
    if (!hasChanges) {
      alert("Không có thay đổi.");
      return;
    }
      console.log("Updated warranty:", updatedWarranty);
      try {
        const response = await axios({
            url: `${SummaryApi.deleteWarranty.url}/${id}`,
          method: SummaryApi.updateWarranty.method,
          data: updatedWarranty,
          withCredentials: true,
        });
  
        alert("Warranty updated successfully!");
        getAllWarranty();
      } catch (error) {
        console.error("Error adding Warranty:", error);
        alert("An error occurred. Please try again later.");
      }
    setIsModalOpen(false);
  };
  

  useEffect(() => {
    getAllWarranty();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Quản lý bảo hành</h1>
      <AddWarranty
        formData={formData}
        warrantyTypes={warrantyTypes}
        durationUnits={durationUnits}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <WarrantyManagementTable
        warranties={warranties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditWarrantyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        warranty={selectedWarranty}
        onSave={handleSave}
      />
    </div>
  );
}

export default WarrantyManagement;
