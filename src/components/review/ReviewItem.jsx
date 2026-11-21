import { FaStar, FaTrash, FaEdit } from "react-icons/fa";
import React from "react";
const ReviewItem = ({ review, loggedUserId, openDeleteModal, onEdit }) => {
  const isUserReview =
    String(review.user?._id || review.user) === String(loggedUserId);

  return (
    <div
      className={`border !rounded-3 !p-4 bg-white shadow-sm ${
        isUserReview ? "border-primary" : ""
      }`}
    >
      <div className="d-flex align-items-center justify-content-between !mb-2">
        <div className="d-flex align-items-center gap-3">
          <img
            src={review.user?.avatar || "https://i.pravatar.cc/100"}
            alt={review.user?.firstName || "User"}
            className="!rounded-circle object-center"
            width="48"
            height="48"
          />
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <strong>{review.user?.firstName || "مستخدم"}</strong>
              <div className="d-flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    size={14}
                    className={
                      i <= review.rating ? "text-warning" : "text-muted"
                    }
                  />
                ))}
              </div>
            </div>
            <small className="text-muted">
              {new Date(review.createdAt).toLocaleDateString()}
            </small>
          </div>
        </div>

        {isUserReview && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEdit(review)} // نرسل التعليق للأب لملء الفورم
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => openDeleteModal(review._id)}
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>
      <p className="text-muted !mb-0">{review.title}</p>
    </div>
  );
};

export default React.memo(ReviewItem);
