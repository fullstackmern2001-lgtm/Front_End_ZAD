import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import useAddServiceToCart from "../../hook/service/useAddServiceToCart";
import React from "react";
const ServicesInfo = ({ service }) => {
  const {
    handleAddToCart,
    handleToggleWishlist,
    isFav,
    quantity,
    minQuantity,
    isCartLoading,
    isQuantityPromptOpen,
    cancelAddToCart,
    price,
    donationTotal,
    handleQuantityChange,
  } = useAddServiceToCart(service);

  return (
    <div className="!p-4 md:!p-6 lg:!p-8 bg-white  shadow-lg">
      <h2 className="fw-bold !text-2xl md:text-3xl !mb-4">{service?.name}</h2>

      <div
        className="flex items-center gap-2 !mb-4 text-sm text-gray-600"
        aria-label={`التقييم ${Number(service?.averageRating || 0).toFixed(1)} من 5 من ${service?.reviewCount || 0} تقييم`}
      >
        <FaStar className="text-amber-400" aria-hidden="true" />
        {service?.reviewCount ? (
          <span>
            {Number(service.averageRating).toFixed(1)} من 5
            <span className="!mx-1">·</span>
            {service.reviewCount} تقييم
          </span>
        ) : (
          <span>لا توجد تقييمات بعد</span>
        )}
      </div>

      <div className="flex flex-wrap items-baseline gap-3 !mb-4">
        <span className="text-2xl md:text-3xl font-bold text-green-900">
          ${price.toFixed(2)}
        </span>
        <span className="text-sm text-gray-600">سعر الخدمة</span>
      </div>

      <p className="text-gray-700 !mb-6 text-sm md:text-base">
        {service?.description}
      </p>
      <p className="!mb-6 text-sm text-gray-600">
        أقل كمية للتبرع: {minQuantity}
      </p>

      {isQuantityPromptOpen && (
        <div
          className="!mb-6 !space-y-3 !rounded-xl !bg-green-50 !p-4"
          dir="rtl"
        >
          <label
            htmlFor="service-quantity"
            className="block font-semibold text-green-900"
          >
            الكمية المراد التبرع بها
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <input
              id="service-quantity"
              type="number"
              min={minQuantity}
              step="1"
              inputMode="numeric"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-36 !rounded-lg border border-green-300 bg-white !px-3 !py-2"
            />
            <span className="text-sm text-amber-800">
              أقل كمية لهذه الخدمة: {minQuantity}
            </span>
          </div>
          <p className="font-semibold text-green-900">
            إجمالي التبرع: ${donationTotal.toFixed(2)}
          </p>
          <button
            type="button"
            onClick={cancelAddToCart}
            className="!rounded-lg border border-gray-300 !px-4 !py-2 text-sm text-gray-700"
          >
            إلغاء
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 !mt-6">
        <button
          onClick={handleAddToCart}
          disabled={isCartLoading}
          className="flex-1 flex items-center justify-center gap-2 !py-3 !rounded-xl bg-green-900 text-white font-semibold hover:bg-green-700 transition"
        >
          <FaShoppingCart />
          {isCartLoading
            ? "جاري الإضافة..."
            : isQuantityPromptOpen
              ? "تأكيد إضافة الخدمة للسلة"
              : "أضف للسلة"}
        </button>

        <button
          onClick={handleToggleWishlist}
          className={`flex-1 flex items-center justify-center gap-2 !py-3 !rounded-xl font-semibold border transition ${
            isFav
              ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
              : "bg-white text-red-600 border-red-600 hover:bg-red-50"
          }`}
        >
          <FaHeart />
          {isFav ? "إزالة من المفضلة" : "أضف للمفضلة"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ServicesInfo);
