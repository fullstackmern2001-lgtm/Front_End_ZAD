import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { ReviewCardSkeleton, SkeletonList } from "../utils/ContentSkeletons";
import useHomeReviews from "../../hook/review/useHomeReviews";

const ReviewsSection = () => {
  const { reviews, isLoading, error, getSlides, getReviewUserName } =
    useHomeReviews();

  const renderReview = (review) => {
    const userName = getReviewUserName(review);

    return (
      <div
        key={review._id}
        className="group h-full overflow-hidden !rounded-2xl bg-white shadow-md border border-green-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      >
        {review.service?.image && (
          <div className="h-44 overflow-hidden">
            <img
              src={review.service.image}
              alt={review.service.name || "الخدمة"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="!p-5">
          <div className="flex items-center gap-3">
            <img
              src={review.user?.avatar || "https://i.pravatar.cc/100"}
              alt={userName}
              className="h-14 w-14 !rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-green-900">{userName}</h3>
              <div className="flex gap-1 text-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= review.rating ? "text-gray-500" : "text-green-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="!mt-4 min-h-20 leading-7 text-gray-700">
            {review.title || "لا يوجد تعليق"}
          </p>
        </div>
      </div>
    );
  };

  const renderCarousel = (size, gridClass) => (
    <Carousel
      indicators
      controls
      interval={5000}
      pause="hover"
      touch
      prevIcon={
        <span className="review-arrow">
          <FaArrowRight />
        </span>
      }
      nextIcon={
        <span className="review-arrow">
          <FaArrowLeft />
        </span>
      }
      className="reviews-carousel"
    >
      {getSlides(size).map((slide, index) => (
        <Carousel.Item key={index}>
          <div className={`grid ${gridClass} gap-5 !px-3 !py-5`}>
            {slide.map(renderReview)}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  return (
    <section
      className="w-full overflow-hidden bg-[#f0fdf4] !py-16 md:!py-24"
      dir="rtl"
    >
      <div className="container !mx-auto !px-5 md:!px-8 lg:!px-12">
        <div className="!mb-12 text-center md:!mb-16">
          <span className="!text-green-700 text-lg font-bold">
            آراء العملاء
          </span>
          <h2 className="!mt-3 text-3xl font-extrabold text-green-900 md:text-4xl lg:text-5xl">
            ماذا يقول عملاؤنا عنا؟
          </h2>
          <p className="mx-auto !mt-5 max-w-3xl text-base leading-8 text-gray-600 md:text-lg">
            آراء عملائنا قد تساعدك في اتخاذ قرارك بكل أريحية، ولا تتردد في
            التواصل معنا إذا كان هناك أي استفسار.
          </p>
          <div className="!mx-auto !mt-5 h-1 w-20 !rounded-full bg-green-900" />
        </div>

        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <SkeletonList count={4} Card={ReviewCardSkeleton} />
          </div>
        ) : error ? (
          <p className="!py-8 text-center text-red-600">{error}</p>
        ) : reviews.length === 0 ? (
          <p className="!py-8 text-center text-gray-600">
            لا يوجد تعليقات بعد.
          </p>
        ) : (
          <>
            <div className="hidden lg:block">
              {renderCarousel(4, "grid-cols-4")}
            </div>
            <div className="hidden sm:block lg:hidden">
              {renderCarousel(2, "grid-cols-2")}
            </div>
            <div className="sm:hidden">{renderCarousel(1, "grid-cols-1")}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default React.memo(ReviewsSection);
