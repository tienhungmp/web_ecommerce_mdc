import React from "react";

function ReviewModal({ reviews, onClose }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <h2 className="text-xl font-semibold mb-4">Chi tiết đánh giá</h2>
        <div className="mb-4">
          <span className="block text-sm text-gray-500">Tên:</span>
          <span className="text-sm">{reviews?.username || "N/A"}</span>
        </div>
        <div className="mb-4">
          <span className="block text-sm text-gray-500">Sản phẩm:</span>
          <span className="text-sm">{reviews?.product?.name || "N/A"}</span>
        </div>
        <div className="mb-4">
          <span className="block text-sm text-gray-500">Đánh giá:</span>
          <p className="text-sm">{reviews?.comment || "No comment"}</p>
        </div>
        <div className="mb-4">
          <span className="block text-sm text-gray-500">Số sao:</span>
          <span className="text-sm">{reviews?.rating || "N/A"}</span>
        </div>
        <div className="mb-4">
          <span className="block text-sm text-gray-500">Ngày:</span>
          <span className="text-sm">
            {new Date(reviews?.createdAt).toLocaleDateString() || "N/A"}
          </span>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
