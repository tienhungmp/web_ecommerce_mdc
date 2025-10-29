import React, { useEffect, useState } from "react";
import axios from "axios";
import { SummaryApi } from "../../../common";
import { toast } from "react-toastify";
import ReviewModal from "./ReviewModal";

function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedreviews, setSelectedreviews] = useState(null); // State cho reviews được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý modal

  const getAllReview = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: SummaryApi.getAllReview.url,
        method: SummaryApi.getAllReview.method,
        withCredentials: true,
      });
      setReviews(response.data.review);
      console.log('đas',response.data);
      
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviewss. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewreviews = (item) => {
    setSelectedreviews(item); // Set reviews được chọn
    setIsModalOpen(true); // Mở modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedreviews(null); // Reset reviews
  };

  const handleDeletereviews = async (id) => {
    if (window.confirm("Are you sure you want to delete this reviews?")) {
      try {
        await axios({
          url: SummaryApi.deleteReview.url.replace(":id", id),
          method: SummaryApi.deleteReview.method,
          withCredentials: true,
        });
        setReviews((prev) => prev.filter((reviews) => reviews?._id !== id));
        toast.success("reviews deleted successfully!");
      } catch (error) {
        console.error("Error deleting reviews:", error);
        toast.error("Failed to delete reviews. Please try again.");
      }
    }
  };

  useEffect(() => {
    getAllReview();
  }, []);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full text-gray-700 text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left leading-4 text-primary tracking-wider">
                  Tên 
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Đánh giá
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Số sao
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Ngày
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider whitespace-nowrap">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading reviewss...
                  </td>
                </tr>
              ) : reviews?.length > 0 ? (
                reviews?.map((item) => (
                  <tr key={item?._id} className="hover:bg-gray-100">
                    <td className="px-6 py-2 border-b border-gray-300">
                      {item?.username}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      {item?.product?.name || "N/A"}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      {item?.comment}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                    {item?.rating}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300 whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewreviews(item)}
                        >
                          Xem
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDeletereviews(item?._id)}
                        >
                          Xóa
                        </button>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-2 border-b border-gray-300 text-center"
                  >
                    No reviews available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && selectedreviews && (
        <ReviewModal reviews={selectedreviews} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default ReviewManagement;
