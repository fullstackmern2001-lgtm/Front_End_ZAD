import { useCallback, useEffect, useState } from "react";
import notify from "../useNotifaction";
import * as reviewApi from "../../store/features/review/reviewServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useAdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const loadReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await reviewApi.getAllReviews({ page, limit: 10 });
      setReviews(response.data?.data || []);
      setPagination(response.data?.paginationResult || null);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل التقييمات"));
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleDelete = async () => {
    if (!reviewToDelete) return;
    try {
      setIsDeleting(true);
      await reviewApi.deleteReview(reviewToDelete._id);
      notify("تم حذف التقييم بنجاح", "success");
      setReviewToDelete(null);
      if (reviews.length === 1 && page > 1) setPage((current) => current - 1);
      else await loadReviews();
    } catch (requestError) {
      notify(getApiErrorMessage(requestError, "تعذر حذف التقييم"), "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    if (!isDeleting) setReviewToDelete(null);
  };
  const requestDelete = (review) => setReviewToDelete(review);
  const goToPreviousPage = () => setPage((current) => Math.max(1, current - 1));
  const goToNextPage = () =>
    setPage((current) =>
      Math.min(pagination?.numberOfPages || current, current + 1),
    );

  return {
    reviews,
    pagination,
    page,
    setPage,
    isLoading,
    isDeleting,
    error,
    reviewToDelete,
    pageCount: pagination?.numberOfPages || 0,
    loadReviews,
    handleDelete,
    requestDelete,
    goToPage: setPage,
    goToPreviousPage,
    goToNextPage,
    closeDeleteModal,
  };
};

export default useAdminReviews;
