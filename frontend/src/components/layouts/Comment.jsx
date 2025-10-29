import React, { useContext, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Context from "../../context";

const Comment = ({ productId, onSubmit, loading, error }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const { userData } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData?.user?.name) {
      alert("Bạn cần đăng nhập để bình luận.");
      return;
    }
    if (!rating) {
      alert("Vui lòng chọn số sao.");
      return;
    }
    if (!comment.trim()) {
      alert("Vui lòng nhập bình luận.");
      return;
    }
    onSubmit(rating, comment, userData?.user?.name);
    setRating(0);
    setComment("");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-2 mt-4"
        disabled={loading}
      >
        <div className="px-3 mb-4 space-y-1">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="cursor-pointer"
              >
                {rating >= star || hover >= star ? (
                  <AiFillStar size={18} className="text-primary" />
                ) : (
                  <AiOutlineStar size={18} className="text-gray-400" />
                )}
              </span>
            ))}
          </div>
          <textarea
            placeholder="Comment ..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            minLength={2}
            className="w-full bg-gray-100 rounded border focus:border-primary leading-normal py-2 px-3 focus:outline-none focus:bg-white placeholder:text-gray-400"
          ></textarea>
        </div>
        <div className="flex justify-end items-center px-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-5 py-2 rounded-md text-primary hover:text-white text-sm border border-primary ${
              loading ? "bg-gray-300" : "hover:bg-primary"
            }`}
          >
            {loading ? "Loading..." : "Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
