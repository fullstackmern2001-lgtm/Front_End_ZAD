import React from "react";
import { LoaderCircle, Star, Trash2 } from "lucide-react";
import Modal from "../../components/admin/Modal";
import useAdminReviews from "../../hook/review/useAdminReviews";

const ReviewsPage = () => {
  const {
    reviews,
    page,
    isLoading,
    isDeleting,
    error,
    reviewToDelete,
    pageCount,
    loadReviews,
    handleDelete,
    requestDelete,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    closeDeleteModal,
  } = useAdminReviews();

  return (
    <section className="!space-y-6" dir="rtl">
      <header className="rounded-2xl border border-[#ddf1f2] bg-white !p-5 shadow-sm">
        <p className="text-sm font-semibold text-[#287c91]">إدارة المحتوى</p>
        <h1 className="!mt-1 text-2xl !font-bold text-[#174b5a]">
          تقييمات المستخدمين
        </h1>
        <p className="!mt-2 text-sm text-gray-600">
          عرض التقييمات المنشورة على الخدمات وحذف التقييم عند الحاجة.
        </p>
      </header>

      {error && (
        <div className="rounded-xl bg-red-50 !p-5 text-red-800" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={loadReviews}
            className="!mt-3 rounded-lg border border-red-300 !px-4 !py-2 font-semibold"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {isLoading ? (
        <div
          className="flex min-h-48 items-center justify-center gap-2 text-[#174b5a]"
          role="status"
        >
          <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
          جاري تحميل التقييمات...
        </div>
      ) : !error && reviews.length === 0 ? (
        <div className="rounded-2xl bg-white !py-14 text-center text-gray-600 shadow">
          لا توجد تقييمات حتى الآن.
        </div>
      ) : !error ? (
        <>
          <div className="grid gap-4">
            {reviews.map((review) => {
              const userName =
                [review.user?.firstName, review.user?.lastName]
                  .filter(Boolean)
                  .join(" ") || "مستخدم";
              return (
                <article
                  key={review._id}
                  className="rounded-2xl border border-[#ddf1f2] bg-white !p-4 shadow-sm sm:!p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-start gap-3">
                      {review.user?.avatar ? (
                        <img
                          src={review.user.avatar}
                          alt={userName}
                          className="h-12 w-12 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ddf1f2] font-bold text-[#174b5a]"
                        >
                          {userName.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h2 className="font-bold text-[#174b5a]">
                            {userName}
                          </h2>
                          <span className="text-xs text-gray-500">
                            {review.createdAt
                              ? new Date(review.createdAt).toLocaleDateString(
                                  "ar",
                                )
                              : ""}
                          </span>
                        </div>
                        <div
                          className="!mt-1 flex items-center gap-1 text-amber-500"
                          aria-label={`التقييم ${review.rating} من 5`}
                        >
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Star
                              key={rating}
                              size={16}
                              fill={
                                rating <= Number(review.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                          <span className="!mr-1 text-sm text-gray-600">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => requestDelete(review)}
                      disabled={isDeleting}
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 !px-4 !py-2 font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={17} aria-hidden="true" />
                      حذف التقييم
                    </button>
                  </div>

                  <div className="!mt-4 rounded-xl bg-[#f5f8f7] !p-4">
                    <p className="whitespace-pre-line leading-7 text-gray-700">
                      {review.title || "لم يضف المستخدم تعليقًا."}
                    </p>
                    <p className="!mt-2 text-sm font-semibold text-[#287c91]">
                      الخدمة: {review.service?.name || "خدمة محذوفة"}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          {pageCount > 1 && (
            <nav
              className="flex flex-wrap items-center justify-center gap-2"
              aria-label="صفحات التقييمات"
            >
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={page === 1}
                className="rounded-xl border border-[#ddf1f2] bg-white !px-4 !py-2 font-semibold text-[#174b5a] disabled:opacity-50"
              >
                السابق
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => goToPage(pageNumber)}
                    aria-current={pageNumber === page ? "page" : undefined}
                    className={`h-10 min-w-10 rounded-xl !px-3 font-semibold ${
                      pageNumber === page
                        ? "bg-[#174b5a] text-white"
                        : "border border-[#ddf1f2] bg-white text-[#287c91]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={goToNextPage}
                disabled={page === pageCount}
                className="rounded-xl border border-[#ddf1f2] bg-white !px-4 !py-2 font-semibold text-[#174b5a] disabled:opacity-50"
              >
                التالي
              </button>
            </nav>
          )}
        </>
      ) : null}

      {reviewToDelete && (
        <Modal
          onClose={closeDeleteModal}
        >
          <h2 className="!mb-3 text-xl !font-bold text-[#174b5a]">
            تأكيد حذف التقييم
          </h2>
          <p className="!mb-6 text-gray-700">
            هل أنت متأكد من حذف تقييم {reviewToDelete.user?.firstName || "المستخدم"}؟
            لا يمكن التراجع عن هذا الإجراء.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={isDeleting}
              className="rounded-xl border !px-5 !py-2 disabled:opacity-60"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 rounded-xl bg-red-600 !px-5 !py-2 font-semibold text-white disabled:opacity-60"
            >
              {isDeleting ? (
                <>
                  <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                  جاري الحذف...
                </>
              ) : (
                "نعم، احذف"
              )}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default React.memo(ReviewsPage);
