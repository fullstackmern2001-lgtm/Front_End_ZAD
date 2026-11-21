import React from "react";
import { Link } from "react-router-dom";
import { LoaderCircle, Plus } from "lucide-react";
import ProofFormModal from "../../components/admin/proof/ProofFormModal";
import ProofDeleteModal from "../../components/admin/proof/ProofDeleteModal";
import useAdminProofs from "../../hook/proof/useAdminProofs";

const ProofsPage = () => {
  const {
    isCreatePage,
    page,
    setPage,
    proofs,
    pagination,
    isLoading,
    error,
    reload,
    selectedProof,
    setSelectedProof,
    deleteProof,
    setDeleteProof,
    isSaving,
    isDeleting,
    mutationError,
    pageCount,
    closeForm,
    handleSave,
    handleDelete,
    closeDelete,
    openEdit,
    requestDelete,
    goToPage,
  } = useAdminProofs();
  const isFormOpen = isCreatePage || Boolean(selectedProof);

  return (
    <section className="!space-y-6" dir="rtl">
      <header className="flex flex-col gap-4 rounded-2xl border border-[#ddf1f2] bg-white !p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#287c91]">إدارة المحتوى</p>
          <h1 className="!mt-1 text-2xl !font-bold text-[#174b5a]">
            التوثيقات
          </h1>
        </div>
        <Link
          to={isCreatePage ? "/admin/proofs" : "/admin/proofs/new"}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#174b5a] !px-5 !py-3 font-semibold text-[#174b5a] transition hover:bg-[#f5f8f7]"
        >
          {isCreatePage ? (
            "عرض كل التوثيقات"
          ) : (
            <>
              <Plus className="h-5 w-5" aria-hidden="true" />
              إضافة توثيق
            </>
          )}
        </Link>
      </header>

      {mutationError && (
        <div className="rounded-xl bg-red-50 !p-4 text-red-800" role="alert">
          {mutationError}
        </div>
      )}

      {!isCreatePage && isLoading && proofs.length === 0 && (
        <div className="flex min-h-48 items-center justify-center gap-2 text-[#174b5a]" role="status">
          <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
          جاري تحميل التوثيقات...
        </div>
      )}

      {!isCreatePage && error && (
        <div className="rounded-xl bg-red-50 !p-5 text-center text-red-800" role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={reload}
            className="!mt-3 rounded-lg border border-red-300 !px-4 !py-2"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {!isCreatePage && !isLoading && !error && (
        proofs.length ? (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {proofs.map((proof) => (
                <article
                  key={proof._id}
                  className="overflow-hidden rounded-2xl border border-[#ddf1f2] bg-white shadow-sm"
                >
                  <img
                    src={proof.image}
                    alt={proof.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="!p-4">
                    <h2 className="text-lg !font-bold text-[#174b5a]">
                      {proof.title}
                    </h2>
                    <p className="!mt-2 line-clamp-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                      {proof.description}
                    </p>
                    <div className="!mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(proof)}
                        disabled={isSaving || isDeleting}
                        className="flex-1 rounded-lg bg-[#174b5a] !px-3 !py-2 font-semibold text-white disabled:opacity-60"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => requestDelete(proof)}
                        disabled={isSaving || isDeleting}
                        className="flex-1 rounded-lg bg-red-600 !px-3 !py-2 font-semibold text-white disabled:opacity-60"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {pageCount > 1 && (
              <nav
                className="flex flex-wrap items-center justify-center gap-2"
                aria-label="صفحات التوثيقات"
              >
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
              </nav>
            )}
          </>
        ) : (
          <div className="rounded-2xl bg-white !py-14 text-center text-gray-600 shadow">
            لا توجد توثيقات بعد. ابدأ بإضافة أول توثيق.
          </div>
        )
      )}

      {isFormOpen && (
        <ProofFormModal
          proof={selectedProof}
          loading={isSaving}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}
      {deleteProof && (
        <ProofDeleteModal
          loading={isDeleting}
          onConfirm={handleDelete}
          onClose={closeDelete}
        />
      )}
    </section>
  );
};

export default React.memo(ProofsPage);
