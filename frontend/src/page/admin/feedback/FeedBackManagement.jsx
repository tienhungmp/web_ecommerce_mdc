import React, { useEffect, useState } from "react";
import axios from "axios";
import { SummaryApi } from "../../../common";
import { toast } from "react-toastify";
import FeedbackModal from "./FeedbackModal"; // Import FeedbackModal

function FeedBackManagement() {
  const [feedback, setFeedBack] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // State cho feedback được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý modal

  const getAllFeedBack = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: SummaryApi.getAllFeedBack.url,
        method: SummaryApi.getAllFeedBack.method,
        withCredentials: true,
      });
      setFeedBack(response.data.feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to load feedbacks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewFeedback = (item) => {
    setSelectedFeedback(item); // Set feedback được chọn
    setIsModalOpen(true); // Mở modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedFeedback(null); // Reset feedback
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await axios({
          url: SummaryApi.deleteFeedBack.url.replace(":id", id),
          method: SummaryApi.deleteFeedBack.method,
          withCredentials: true,
        });
        setFeedBack((prev) => prev.filter((feedback) => feedback._id !== id));
        toast.success("Feedback deleted successfully!");
      } catch (error) {
        console.error("Error deleting feedback:", error);
        toast.error("Failed to delete feedback. Please try again.");
      }
    }
  };

  useEffect(() => {
    getAllFeedBack();
  }, []);

  return (
    <>
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full text-gray-700 text-sm border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left leading-4 text-primary tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Tên
                </th>
                <th className="px-4 py-2 border-b font-semibold border-gray-300 text-left text-sm leading-4 text-primary tracking-wider">
                  Lời nhắn
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
                    Loading feedbacks...
                  </td>
                </tr>
              ) : feedback?.length > 0 ? (
                feedback?.map((item) => (
                  <tr key={item?._id} className="hover:bg-gray-100">
                    <td className="px-6 py-2 border-b border-gray-300">
                      {item?.email}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      {item?.phone || "N/A"}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      {item?.name}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      <p className="line-clamp-1">{item?.message}</p>
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-2 border-b border-gray-300 whitespace-nowrap">
                      <span className="flex items-center gap-2">
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleViewFeedback(item)}
                        >
                          Xem
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDeleteFeedback(item?._id)}
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
                    No feedback available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && selectedFeedback && (
        <FeedbackModal feedback={selectedFeedback} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default FeedBackManagement;
