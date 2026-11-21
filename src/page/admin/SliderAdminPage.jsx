import {
  NewsCardSkeleton,
  SkeletonList,
} from "../../components/utils/ContentSkeletons";
import SliderModal from "../../components/admin/slider/SliderModal";
import React from "react";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useSliderAdminPage from "../../hook/slider/useSliderAdminPage";
const AllSliderAdmin = () => {
  const {
    isLoading,
    isFetching,
    isMutating,
    error,
    reload,
    handleOpenModal,
    modalOpen,
    form,
    handleFormChange,
    handleImageChange,
    handleSubmit,
    sliders,
    handleDelete,
    isCreatePage,
    submitSlider,
    closeSliderModal,
  } = useSliderAdminPage();

  if (isFetching && sliders.length === 0 && !modalOpen) {
    return (
      <>
        <p className="!mb-4 flex items-center justify-center gap-2 text-green-800" role="status">
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          جاري تحميل السلايدر...
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonList count={6} Card={NewsCardSkeleton} />
        </div>
      </>
    );
  }

  return (
    <div className="!py-10 !px-4">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#ddf1f2] bg-white !p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[#174b5a]">
          {isCreatePage ? "إضافة سلايدر" : "إدارة السلايدر"}
        </h2>
        <Link
          to={isCreatePage ? "/admin/sliders" : "/admin/sliders/new"}
          className="!rounded-xl border border-[#174b5a] !px-5 !py-3 font-semibold text-[#174b5a] transition hover:bg-[#f5f8f7]"
        >
          {isCreatePage ? "عرض كل السلايدرز" : "إضافة سلايدر"}
        </Link>
      </div>

      {error && (
        <div role="alert" className="!mb-4 rounded-xl border border-red-200 bg-red-50 !p-4 text-red-700">
          <p>{typeof error === "string" ? error : "تعذر تنفيذ طلب السلايدر"}</p>
          {!sliders.length && (
            <button type="button" onClick={reload} className="mt-3 rounded-lg border border-red-300 px-4 py-2">
              إعادة المحاولة
            </button>
          )}
        </div>
      )}
      {isMutating && (
        <p className="mb-4 flex items-center justify-center gap-2 text-green-800" role="status">
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          جاري تنفيذ العملية...
        </p>
      )}

      {modalOpen && (
        <SliderModal
          open={modalOpen}
          onClose={closeSliderModal}
          form={form}
          onFormChange={handleFormChange}
          onImageChange={handleImageChange}
          onSubmit={submitSlider}
          onViewAll={isCreatePage ? closeSliderModal : undefined}
          isSubmitting={isLoading}
        />
      )}

      {!isCreatePage && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sliders?.length > 0 ? (
          sliders.map((slider) => (
            <div
              key={slider._id}
              className="bg-white rounded-2xl shadow p-4 flex flex-col items-center gap-2"
            >
              <img
                src={slider.image}
                alt={slider.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              <h3 className="font-semibold text-lg">{slider.name}</h3>
              <p className="text-gray-600">{slider.des}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleOpenModal(slider)}
                  disabled={isMutating}
                  className="px-3 py-1 rounded-full bg-green-900 text-white"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(slider._id)}
                  disabled={isMutating}
                  className="px-3 py-1 rounded-full bg-red-500 text-white"
                >
                  حذف
                </button>
              </div>
            </div>
          ))
        ) : error ? null : (
          <p className="text-gray-600 col-span-full text-center py-6">
            لا يوجد سلايدرز حالياً
          </p>
        )}
      </div>}
    </div>
  );
};

export default React.memo(AllSliderAdmin);
