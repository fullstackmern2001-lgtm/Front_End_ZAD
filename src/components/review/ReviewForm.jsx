import React from "react";
import { FaStar } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";
import useReviewForm from "../../hook/review/useReviewForm";

const ReviewForm = ({
  user,
  serviceId,
  setActiveTab,
  editReviewData,
  onReviewChange,
}) => {
  const {
    rating,
    comment,
    handleRatingChange,
    handleCommentChange,
    handleSubmitReview,
    editId,
    isSubmitting,
  } = useReviewForm(serviceId, setActiveTab, editReviewData, onReviewChange);

  return (
    <div className="col-lg-6 col-md-8 col-12">
      <div className="border !rounded-3 !p-4 bg-white shadow-sm">
        <div className="d-flex align-items-center gap-3 !mb-3">
          <img
            src={user?.avatar || "https://i.pravatar.cc/100"}
            alt={user?.firstName || "User"}
            className="!rounded-circle object-center"
            width="30"
            height="30"
          />
          <strong>{user?.firstName}</strong>
        </div>

        {/* Rating */}
        <div className="!mb-3">
          <div className="d-flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                size={22}
                className={i <= rating ? "text-warning" : "text-muted"}
                style={{ cursor: "pointer" }}
                onClick={() => handleRatingChange(i)}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="!mb-3">
          <textarea
            className="form-control"
            rows="4"
            placeholder="اكتب تعليقك..."
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-dark !px-4 inline-flex items-center gap-2"
          onClick={handleSubmitReview}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle
                className="h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              جارٍ الإرسال...
            </>
          ) : editId ? (
            "تحديث التعليق"
          ) : (
            "إرسال التعليق"
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ReviewForm);
