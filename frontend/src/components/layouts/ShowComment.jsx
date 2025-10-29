import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SummaryApi } from "../../common";
import Context from "../../context";
import { toast } from "react-toastify";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function ShowComment({ reviews, setReviews }) {
  const [usernames, setUsernames] = useState({});
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(Context);

  const [editReviewId, setEditReviewId] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const [visibleReviews, setVisibleReviews] = useState(3); // Ban đầu chỉ hiển thị 3 bình luận
  const [isAllReviewsVisible, setIsAllReviewsVisible] = useState(false); // Kiểm tra xem có hiển thị tất cả review không

  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-yellow-500">
            ★
          </span> // Full star
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ★
          </span> // Empty star
        );
      }
    }
    return stars;
  };

  const handleEditClick = (review) => {
    setEditReviewId(review?._id);
    setNewRating(review?.rating);
    setNewComment(review?.comment);
  };

  const handleUpdateReview = async () => {
    if (!newRating || !newComment.trim()) {
      toast.error("Vui lòng chọn số sao và nhập bình luận.");
      return;
    }

    try {
      const response = await axios({
        url: SummaryApi.updateComment.url.replace(":id", editReviewId),
        method: SummaryApi.updateComment.method,
        data: { rating: newRating, comment: newComment },
        withCredentials: true,
      });

      // Cập nhật lại bình luận trong state reviews
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === editReviewId
            ? { ...review, rating: newRating, comment: newComment }
            : review
        )
      );

      toast.success("Bình luận đã được cập nhật!");

      // Đóng form chỉnh sửa
      setEditReviewId(null);
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật bình luận.");
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      // Gửi yêu cầu xóa bình luận
      await axios({
        url: SummaryApi.deleteReview.url.replace(":id", id),
        method: SummaryApi.deleteReview.method,
        withCredentials: true,
      });

      // Cập nhật danh sách bình luận trong state
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== id)
      );

      // Thông báo thành công
      toast.success("Xóa review thành công!");
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Đã xảy ra lỗi khi xóa bình luận.");
    }
  };

  const handleShowMore = () => {
    setIsAllReviewsVisible(true);
    setVisibleReviews(reviews?.length); // Hiển thị tất cả bình luận
  };

  const handleShowLess = () => {
    setIsAllReviewsVisible(false);
    setVisibleReviews(3); // Chỉ hiển thị 3 bình luận ban đầu
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setLoading(false);
    }
  }, [reviews]);

  return (
    <div>
      <hr />
      {loading ? (
        <p className="text-center py-4">Chưa có bình luận.</p>
      ) : (
        <div
          className="relative"
          style={{ maxHeight: "400px", overflowY: "auto" }} // Thiết lập khả năng cuộn
        >
          {reviews?.slice(0, visibleReviews).map((review) => (
            <div key={review?._id} className="mb-6 mx-2 group">
              <h2>
                <span className="capitalize text-xs mr-4">
                  {review?.username}
                </span>
                <span className="text-[10px] text-gray-400">
                  {review?.createdAt
                    ? new Date(review.createdAt).toLocaleString()
                    : ""}
                </span>
              </h2>

              {/* Nếu đang chỉnh sửa thì cho phép chỉnh sửa số sao */}
              {editReviewId === review?._id ? (
                <div className="flex items-center mx-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer ${
                        star <= newRating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => setNewRating(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex items-center mx-8">
                  {renderStars(review?.rating)}
                </div>
              )}

              {/* Nếu đang chỉnh sửa thì cho phép chỉnh sửa bình luận */}
              {editReviewId === review?._id ? (
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="4"
                  className="w-full p-2 border border-gray-300"
                />
              ) : (
                <p className="mx-8">{review?.comment}</p>
              )}

              {userData?.user?.userId === review?.user && (
                <div className="text-[10px] flex items-center gap-3">
                  {editReviewId === review?._id ? (
                    <button
                      onClick={handleUpdateReview}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Cập nhật
                    </button>
                  ) : (
                    <>
                      <span
                        className="text-blue-400 cursor-pointer"
                        onClick={() => handleEditClick(review)}
                      >
                        Sửa
                      </span>
                      <span
                        onClick={() => handleDeleteReview(review?._id)}
                        className="text-red-400 cursor-pointer"
                      >
                        Xóa
                      </span>
                    </>
                  )}
                </div>
              )}

              <hr />
            </div>
          ))}

          {/* Hiển thị nút "Xem thêm" nếu chưa hiển thị tất cả */}
          {!isAllReviewsVisible && reviews.length > 3 && (
            <div className="text-center py-2 flex justify-center items-center">
              <button
                onClick={handleShowMore}
                className="text-blue-500 cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                Xem thêm <MdOutlineKeyboardArrowDown />
              </button>
            </div>
          )}

          {/* Hiển thị nút "Ẩn bớt" khi đã xem hết bình luận */}
          {isAllReviewsVisible && reviews.length > 3 && (
            <div className="text-center py-2 flex justify-center items-center">
              <button
                onClick={handleShowLess}
                className="text-blue-500 cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                Ẩn bớt <MdOutlineKeyboardArrowUp />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShowComment;
