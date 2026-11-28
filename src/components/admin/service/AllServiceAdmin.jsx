import React from "react";
import { LoaderCircle } from "lucide-react";
import {
  ServiceCardSkeleton,
  SkeletonList,
} from "../../utils/ContentSkeletons";
import ItemPagination from "../../utils/ItemPagination";
import ServiceEditModal from "./ServiceEditModal";
import ServiceConfirmModal from "./ServiceConfirmModal";

const AllServiceAdmin = ({ serviceAdmin }) => {
  const {
    services,
    pagination,
    pageSize,
    currentPage,
    setCurrentPage,
    loadServices,
    isFetching,
    loadError,
    loading,
    selectedService,
    deleteId,
    setDeleteId,
    handleServiceEdit,
    handleServiceUpdate,
    handleServiceDelete,
    closeSelectedService,
    closeDeleteModal,
  } = serviceAdmin;

  return (
    <>
      {isFetching && (
        <div
          className="flex items-center justify-center gap-2 !py-4 !text-green-800"
          role="status"
          aria-live="polite"
        >
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          جاري تحميل الخدمات...
        </div>
      )}

      {loadError && (
        <div
          className="flex flex-wrap items-center justify-between gap-3 !rounded-xl !bg-red-50 !p-4 !text-red-800"
          role="alert"
        >
          <span>{loadError}</span>
          <button
            type="button"
            onClick={() => loadServices(currentPage, pageSize)}
            disabled={isFetching}
            className="!rounded-lg border border-red-300 !px-4 !py-2 !font-semibold disabled:opacity-60"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {isFetching && services.length === 0 && !loadError ? (
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonList count={4} Card={ServiceCardSkeleton} />
        </div>
      ) : services.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service._id}
              className="flex gap-4 !rounded-2xl bg-white !p-4 shadow"
            >
              <img
                src={service.image}
                alt={service.name}
                className="h-24 w-24 !rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold">{service.name}</h3>
                <p className="text-sm font-semibold text-green-800">
                  التصنيف: {service.category?.name || "بدون تصنيف"}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                  {service.description}
                </p>
                <p className="text-sm text-gray-600">
                  {Number(service.price).toFixed(2)}{" "}
                  $
                </p>
                <button
                  type="button"
                  onClick={() => handleServiceEdit(service)}
                  disabled={loading}
                  className="!ml-3 !mt-3 !rounded-lg bg-green-900 !px-3 !py-1 text-white disabled:opacity-60"
                >
                  تعديل
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteId(service._id)}
                  disabled={loading}
                  className="!mt-3 !rounded-lg bg-red-600 !px-3 !py-1 text-white disabled:opacity-60"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isFetching &&
        !loadError && (
          <p className="rounded-2xl bg-white py-10 text-center text-gray-600 shadow">
            لا توجد خدمات مضافة حتى الآن
          </p>
        )
      )}

      {services.length > 0 && (
        <ItemPagination
          currentPage={currentPage}
          totalPages={pagination.numberOfPages}
          onPageChange={setCurrentPage}
          ariaLabel="صفحات الخدمات في لوحة الإدارة"
          disabled={isFetching || loading}
          className="!pt-4"
        />
      )}

      {selectedService && (
        <ServiceEditModal
          form={serviceAdmin.form}
          categories={serviceAdmin.categories}
          categoryError={serviceAdmin.categoryError}
          loading={loading}
          onChange={serviceAdmin.handleChange}
          onSubmit={handleServiceUpdate}
          onClose={closeSelectedService}
        />
      )}
      {deleteId && (
        <ServiceConfirmModal
          loading={loading}
          onConfirm={handleServiceDelete}
          onClose={closeDeleteModal}
        />
      )}
    </>
  );
};

export default React.memo(AllServiceAdmin);
