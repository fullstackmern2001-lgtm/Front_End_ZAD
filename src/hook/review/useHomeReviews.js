import { useCallback, useEffect, useState } from "react";
import * as reviewApi from "../../store/features/review/reviewServices";

const useHomeReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const getSlides = useCallback(
    (size) => {
      const slides = [];
      for (let index = 0; index < reviews.length; index += size) {
        slides.push(reviews.slice(index, index + size));
      }
      return slides;
    },
    [reviews],
  );
  const getReviewUserName = (review) =>
    [review.user?.firstName, review.user?.lastName]
      .filter(Boolean)
      .join(" ") || "عميل";

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await reviewApi.getServiceReviews({ limit: 20 });
        setReviews(response.data?.data || []);
      } catch (requestError) {
        setError(
          requestError?.response?.data?.message ||
            "تعذر تحميل آراء العملاء",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  return { reviews, isLoading, error, getSlides, getReviewUserName };
};

export default useHomeReviews;
