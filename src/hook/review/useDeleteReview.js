import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/features/review/reviewThunk";
import notify from "../useNotifaction";

const useDeleteReview = (reviewId, handleClose, onReviewChange, onDeleted) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await dispatch(deleteReview(reviewId)).unwrap();
      notify("تم حذف التعليق بنجاح", "success");
      handleClose();
      onDeleted?.();
      await onReviewChange?.();
    } catch (error) {
      notify(error, "error");
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleConfirmDelete };
};

export default useDeleteReview;
