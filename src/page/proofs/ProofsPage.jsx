import React from "react";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import usePublicProofsPage from "../../hook/proof/usePublicProofsPage";

const ProofsPage = () => {
  const {
    page,
    setPage,
    proofs,
    pagination,
    pageCount,
    goToPreviousPage,
    goToNextPage,
    isLoading,
    error,
    reload,
  } = usePublicProofsPage();

  return (
    <main className="container !mx-auto !mt-[100px] !px-5 !py-12 md:!px-8" dir="rtl">
      <header className="page-hero !mb-10 overflow-hidden !rounded-3xl !px-6 !py-10 text-center text-white shadow-lg md:!py-14">
        <p className="font-bold text-[#a8dce5]">أثرٌ نعتز بتوثيقه</p>
        <h1 className="!mt-2 text-3xl font-extrabold text-white md:text-5xl">
          توثيقات المشاريع
        </h1>
        <p className="mx-auto !mt-4 max-w-2xl leading-8 text-white/85">
          صور وقصص من تنفيذ الخدمات والمشاريع التي ساهمتم في إيصالها.
        </p>
      </header>

      {isLoading ? (
        <div className="flex min-h-64 items-center justify-center gap-2 text-[#174b5a]" role="status">
          <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
          جاري تحميل التوثيقات...
        </div>
      ) : error ? (
        <div className="!rounded-2xl bg-red-50 !p-8 text-center text-red-700" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={reload}
            className="!mt-4 !rounded-lg border border-red-300 !px-4 !py-2"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : proofs.length === 0 ? (
        <div className="!rounded-2xl bg-white !py-16 text-center text-gray-600 shadow">
          لا توجد توثيقات منشورة حاليًا.
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {proofs.map((proof, index) => (
              <article
                key={proof._id}
                className="proof-animate group overflow-hidden rounded-2xl border border-[#ddf1f2] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
              >
                <div className="h-56 overflow-hidden sm:h-64">
                  <img
                    src={proof.image}
                    alt={proof.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="!p-5">
                  <span className="text-sm font-bold text-[#6a9f3d]">
                    توثيق مشروع
                  </span>
                  <h2 className="!mt-2 text-xl font-extrabold text-[#174b5a]">
                    {proof.title}
                  </h2>
                  <p className="!mt-3 whitespace-pre-line leading-7 text-gray-600">
                    {proof.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {pageCount > 1 && (
            <nav
              className="!mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="صفحات التوثيقات"
            >
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={page === 1 || isLoading}
                className="rounded-xl border border-[#ddf1f2] bg-white !px-4 !py-2 font-semibold text-[#174b5a] disabled:opacity-50"
              >
                السابق
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    aria-current={pageNumber === page ? "page" : undefined}
                    className={`h-10 min-w-10 rounded-xl !px-3 font-semibold ${
                      pageNumber === page
                        ? "bg-[#174b5a] text-white"
                        : "border border-[#ddf1f2] bg-white text-[#287c91] hover:bg-[#f5f8f7]"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={goToNextPage}
                disabled={page === pageCount || isLoading}
                className="rounded-xl border border-[#ddf1f2] bg-white !px-4 !py-2 font-semibold text-[#174b5a] disabled:opacity-50"
              >
                التالي
              </button>
            </nav>
          )}
          {pagination && (
            <p className="!mt-3 text-center text-sm text-gray-500">
              الصفحة {page} من {pageCount}
            </p>
          )}
        </>
      )}

      <div className="!mt-10 text-center">
        <Link
          to="/"
          className="font-semibold text-[#287c91] hover:text-[#174b5a]"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </main>
  );
};

export default React.memo(ProofsPage);
