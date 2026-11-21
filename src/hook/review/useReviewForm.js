import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import notify from "../useNotifaction";
import {
  createReview,
  updateReview,
} from "../../store/features/review/reviewThunk";

const useReviewForm = (
  serviceId,
  setActiveTab,
  editReviewData,
  onReviewChange,
) => {
  const dispatch = useDispatch();

  // الحالات الداخلية للفورم
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // إذا تم تمرير بيانات تعديل، نملأ الفورم
  useEffect(() => {
    if (editReviewData) {
      setRating(editReviewData.rating);
      setComment(editReviewData.title);
      setEditId(editReviewData._id);
    } else {
      setRating(0);
      setComment("");
      setEditId(null);
    }
  }, [editReviewData]);

  const handleSubmitReview = async () => {
    if (!rating || !comment) {
      notify("الرجاء ادخال تقييم و التعليق", "error");
      return;
    }

    const action = editId
      ? updateReview({ id: editId, data: { rating, title: comment } })
      : createReview({ service: serviceId, rating, title: comment });

    try {
      setIsSubmitting(true);
      await dispatch(action).unwrap();
      notify(`تم ${editId ? "تحديث" : "إضافة"} التعليق بنجاح`, "success");
      setRating(0);
      setComment("");
      setEditId(null);
      setActiveTab("reviews");
      await onReviewChange?.();
    } catch (error) {
      notify(error, "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleRatingChange = (value) => setRating(value);
  const handleCommentChange = (event) => setComment(event.target.value);

  return {
    rating,
    comment,
    handleRatingChange,
    handleCommentChange,
    handleSubmitReview,
    editId,
    isSubmitting,
  };
};

export default useReviewForm;
