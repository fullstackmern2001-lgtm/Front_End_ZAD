import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/features/user/userThunk";
import { getReviews } from "../../store/features/review/reviewThunk";

const useServiceReview = (serviceId) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const loggedUserId = user?._id;
  const { reviews, isLoading } = useSelector((state) => state.review);
  const myReview =
    reviews?.data?.find(
      (review) =>
        String(review.user?._id || review.user) === String(loggedUserId),
    ) || null;
  const sortedReviews = useMemo(
    () =>
      [...(reviews?.data || [])].sort((a, b) => {
        const aUserId = String(a.user?._id || a.user);
        const bUserId = String(b.user?._id || b.user);
        if (aUserId === String(loggedUserId)) return -1;
        if (bUserId === String(loggedUserId)) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }),
    [loggedUserId, reviews?.data],
  );

  const [activeTab, setActiveTab] = useState("reviews");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const [editReviewData, setEditReviewData] = useState(null);

  // فتح نافذة تعديل التعليق
  const handleEditReview = (review) => {
    setEditReviewData(review); // نرسل بيانات التعليق للفورم
    setActiveTab("add"); // فتح تبويب إضافة/تعديل
  };

  // فتح/اغلاق نافذة الحذف
  const openDeleteModal = (id) => {
    setSelectedReviewId(id);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setSelectedReviewId(null);
    setShowDeleteModal(false);
  };
  const openAddReview = () => {
    setEditReviewData(null);
    setActiveTab("add");
  };
  const openReviewsTab = () => setActiveTab("reviews");
  const handleReviewDeleted = () => {
    setEditReviewData(null);
    setActiveTab("add");
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (serviceId) dispatch(getReviews(serviceId));
  }, [dispatch, serviceId]);
  return {
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
    setEditReviewData,
    user,
  };
};

export default useServiceReview;
