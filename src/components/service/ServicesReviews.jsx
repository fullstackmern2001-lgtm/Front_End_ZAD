import React from "react";
import { ReviewCardSkeleton, SkeletonList } from "../utils/ContentSkeletons";
import ServiceReviewItem from "../review/ReviewItem";
import ServiceReviewForm from "../review/ReviewForm";
import DeleteServiceReviewModal from "../review/DeleteReviewModal";
import useServiceReview from "../../hook/review/useServiceReview";

const ServicesReviews = ({ serviceId, onReviewChange }) => {
  const {
    loggedUserId,
    myReview,
    reviews,
    sortedReviews,
    isLoading,
    activeTab,
    showDeleteModal,
    selectedReviewId,
    editReviewData,
    handleEditReview,
    openDeleteModal,
    closeDeleteModal,
    openAddReview,
    openReviewsTab,
    handleReviewDeleted,
    setActiveTab,
    user,
  } = useServiceReview(serviceId);

  return (
    <div className="!mt-5">
      {/* Tabs */}
      <div className="d-flex gap-3 !mb-4">
        <button
          type="button"
          className={`btn btn-sm !px-4 ${activeTab === "reviews" ? "btn-dark" : "btn-outline-secondary"}`}
          onClick={openReviewsTab}
        >
          التقييمات ({reviews?.data?.length || 0})
        </button>
        {!myReview && (
          <button
            type="button"
            className={`btn btn-sm !px-4 ${activeTab === "add" ? "btn-dark" : "btn-outline-secondary"}`}
            onClick={openAddReview}
          >
            إضافة تقييم
          </button>
        )}
      </div>

      {/* Reviews List */}
      {activeTab === "reviews" && (
        <div
          className="d-flex flex-column gap-4"
          style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "8px" }}
        >
          {isLoading ? (
            <SkeletonList count={3} Card={ReviewCardSkeleton} />
          ) : reviews?.data?.length === 0 ? (
            <p>لا يوجد تعليقات بعد.</p>
          ) : (
            sortedReviews.map((review) => (
              <ServiceReviewItem
                key={review._id}
                review={review}
                loggedUserId={loggedUserId}
                openDeleteModal={openDeleteModal}
                onEdit={handleEditReview}
              />
            ))
          )}
        </div>
      )}

      {/* Add/Edit Review */}
      {activeTab === "add" && (
        <ServiceReviewForm
          user={user}
          serviceId={serviceId}
          setActiveTab={setActiveTab}
          editReviewData={editReviewData}
          onReviewChange={onReviewChange}
        />
      )}

      {/* Delete Modal */}
      <DeleteServiceReviewModal
        show={showDeleteModal}
        handleClose={closeDeleteModal}
        reviewId={selectedReviewId}
        onReviewChange={onReviewChange}
        onDeleted={handleReviewDeleted}
      />
    </div>
  );
};

export default React.memo(ServicesReviews);
