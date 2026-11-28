import React from "react";
import FavoriteCard from "../../components/dashpord/favorite/FavoriteCard";
import ItemPagination from "../../components/utils/ItemPagination";
import useFavoritesPage from "../../hook/wishlist/useFavoritesPage";
import {
  ServiceCardSkeleton,
  SkeletonList,
} from "../../components/utils/ContentSkeletons";

const FavoritesPage = () => {
  const {
    services,
    visibleServices,
    page,
    totalPages,
    setPage,
    isLoading,
    error,
  } = useFavoritesPage();

  // حالة الخطأ
  if (error) {
    return (
      <p className="w-full text-center text-red-500 py-8">
        حدث خطأ أثناء تحميل المفضلة: {error}
      </p>
    );
  }

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 gap-4">
        <SkeletonList count={4} Card={ServiceCardSkeleton} />
      </div>
    );
  }

  // حالة عدم وجود منتجات
  if (services.length === 0) {
    return (
      <p className="w-full text-center text-gray-600 py-8 flex items-center justify-center gap-2">
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M12 6a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
        لا يوجد منتجات مفضلة بعد
      </p>
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {visibleServices.map((service) => (
          <FavoriteCard key={service._id} service={service} />
        ))}
      </div>
      <ItemPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        ariaLabel="صفحات الخدمات المفضلة"
      />
    </>
  );
};

export default React.memo(FavoritesPage);
