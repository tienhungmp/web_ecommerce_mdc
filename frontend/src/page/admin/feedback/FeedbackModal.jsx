import React from "react";

const FeedbackModal = ({ feedback, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2 text-sm">
        <h2 className="text-xl font-semibold mb-4">Feedback</h2>
        <div className="mb-4">
          <span className="font-medium">Email:</span> {feedback?.email}
        </div>
        <div className="mb-4">
          <span className="font-medium">Phone:</span> {feedback?.phone || "N/A"}
        </div>
        <div className="mb-4">
          <span className="font-medium">Name:</span> {feedback?.name}
        </div>
        <div className="mb-4">
          <span className="font-medium">Message:</span> <p>{feedback?.message}</p>
        </div>
        <div className="mb-4">
          <span className="font-medium">Date:</span> {new Date(feedback?.createdAt).toLocaleDateString()}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
