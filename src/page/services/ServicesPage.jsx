import React from "react";
import { LoaderCircle, Search, Tag } from "lucide-react";
import useServicesPage from "../../hook/service/useServicesPage";
import ServiceCard from "../../components/service/ServiceCard";
import {
  ServiceCardSkeleton,
  SkeletonList,
} from "../../components/utils/ContentSkeletons";
import ItemPagination from "../../components/utils/ItemPagination";

const ServicesPage = () => {
  const {
    filters,
    categories,
    categoryError,
    page,
    setPage,
    services,
    pagination,
    isLoading,
    error,
    reload,
    handleKeywordChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleCategoryChange,
    handleSortChange,
    resetFilters,
  } = useServicesPage();

  return (
    <main className="!mt-20 !bg-green-50 !px-5 !py-16" dir="rtl">
      <div className="!mx-auto !max-w-7xl">
        <h1 className="!mb-8 !text-center !text-4xl !font-extrabold !text-green-800">
          خدماتنا
        </h1>

        <section
          className="!mb-8 !grid !gap-4 !rounded-2xl !bg-white !p-5 !shadow-sm md:!grid-cols-2 lg:!grid-cols-5"
          aria-label="فلترة الخدمات"
        >
          <label className="relative block lg:col-span-2">
            <span className="!mb-2 !block !text-sm !font-semibold !text-gray-700">
              البحث عن خدمة
            </span>
            <Search
              className="absolute right-3 top-11 !text-gray-400"
              size={18}
              aria-hidden="true"
            />
            <input
              type="search"
              value={filters.keyword}
              onChange={handleKeywordChange}
              placeholder="اكتب اسم الخدمة"
              className="w-full !rounded-xl border border-gray-200 !py-3 !pr-10 !pl-3 outline-none focus:!border-green-700"
            />
          </label>

          <label>
            <span className="!mb-2 block text-sm font-semibold !text-gray-700">
              أقل سعر للوحدة
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={filters.minPrice}
              onChange={handleMinPriceChange}
              placeholder="من"
              className="w-full !rounded-xl border !border-gray-200 !px-3 !py-3 focus:!border-green-700"
            />
          </label>

          <label>
            <span className="!mb-2 block text-sm font-semibold !text-gray-700">
              أعلى سعر للوحدة
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={filters.maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="إلى"
              className="w-full !rounded-xl border !border-gray-200 !px-3 !py-3 focus:!border-green-700"
            />
          </label>

          <label>
            <span className="!mb-2 block text-sm font-semibold !text-gray-700">
              ترتيب الخدمات
            </span>
            <select
              value={filters.sort}
              onChange={handleSortChange}
              className="w-full !rounded-xl border !border-gray-200 bg-white !px-3 !py-3 focus:!border-green-700"
            >
              <option value="newest">الأحدث</option>
              <option value="cheapest">الأقل سعرًا</option>
              <option value="expensive">الأعلى سعرًا</option>
            </select>
          </label>

          <label>
            <span className="!mb-2 block text-sm font-semibold !text-gray-700">
              تصنيف الخدمات
            </span>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              disabled={Boolean(categoryError)}
              className="w-full !rounded-xl border !border-gray-200 bg-white !px-3 !py-3 focus:!border-green-700 disabled:bg-gray-100"
            >
              <option value="">كل التصنيفات</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full !rounded-xl border border-green-800 !px-4 !py-3 font-semibold text-green-800 transition hover:bg-green-50"
            >
              مسح الفلاتر
            </button>
          </div>
        </section>

        {categoryError && (
          <div
            className="!mb-6 rounded-xl bg-amber-50 !p-4 text-amber-800"
            role="alert"
          >
            {categoryError}
          </div>
        )}

        {isLoading ? (
          <>
            <div
              className="!mb-5 flex items-center justify-center gap-2 !text-green-800"
              role="status"
            >
              <LoaderCircle
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              جاري تحميل الخدمات...
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <SkeletonList count={8} Card={ServiceCardSkeleton} />
            </div>
          </>
        ) : error ? (
          <div className="!py-10 text-center !text-red-700" role="alert">
            <p>{error}</p>
            <button
              type="button"
              onClick={reload}
              className="!mt-4 !rounded-lg border !border-red-300 !px-4 !py-2 font-semibold"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : services.length ? (
          <>
            <div className="!mb-4 text-sm !text-gray-600">
              عدد الخدمات: {pagination.totalResults ?? services.length}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
            <ItemPagination
              currentPage={page}
              totalPages={pagination.numberOfPages}
              onPageChange={setPage}
              ariaLabel="صفحات الخدمات"
            />
          </>
        ) : (
          <div className="!py-10 text-center !text-gray-600">
            <Tag
              className="!mx-auto !mb-3 !text-gray-400"
              size={40}
              aria-hidden="true"
            />
            <p>لا توجد خدمات تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default React.memo(ServicesPage);
