import React from "react";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useServicesAdminPage from "../../hook/service/useServicesAdminPage";
import AllServiceAdmin from "../../components/admin/service/AllServiceAdmin";

const ServicesPage = () => {
  const serviceAdmin = useServicesAdminPage();
  const {
    isCreatePage,
    form,
    editingId,
    loading,
    categories,
    categoryError,
    isLoadingCategories,
    loadCategories,
    handleChange,
    resetForm,
    submitService,
  } = serviceAdmin;

  return (
    <div className="!space-y-6" dir="rtl">
      <div className="flex flex-col gap-4 !rounded-2xl border !border-[#ddf1f2] !bg-white !p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[#174b5a]">
          {isCreatePage ? "إضافة خدمة" : "الخدمات"}
        </h2>
        <Link
          to={isCreatePage ? "/admin/services" : "/admin/services/new"}
          className="!rounded-xl border !border-[#174b5a] !px-5 !py-3 font-semibold text-[#174b5a] transition hover:bg-[#f5f8f7]"
        >
          {isCreatePage ? "عرض كل الخدمات" : "إضافة خدمة"}
        </Link>
      </div>
      {isCreatePage && (
        <form
          onSubmit={submitService}
          className="!space-y-3 !rounded-2xl bg-white !p-5 shadow"
        >
          {categoryError && (
            <div
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 !p-3 text-red-800"
              role="alert"
            >
              <span>{categoryError}</span>
              <button
                type="button"
                onClick={loadCategories}
                disabled={isLoadingCategories}
                className="rounded-lg border border-red-300 !px-3 !py-1 font-semibold"
              >
                إعادة المحاولة
              </button>
            </div>
          )}
          <div className="!space-y-2">
            <label
              htmlFor="service-name"
              className="block text-sm font-semibold"
            >
              اسم الخدمة
            </label>
            <input
              id="service-name"
              name="name"
              className="w-full !rounded-xl border !p-3"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="!space-y-2">
            <label
              htmlFor="service-description"
              className="block !text-sm !font-semibold"
            >
              وصف الخدمة
            </label>
            <textarea
              id="service-description"
              name="description"
              className="w-full !rounded-xl border !p-3"
              rows="5"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="!space-y-2">
              <label
                htmlFor="service-price"
                className="block !text-sm !font-semibold"
              >
                سعر الخدمة
              </label>
              <input
                id="service-price"
                name="price"
                className="w-full !rounded-xl border !p-3"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="!space-y-2">
              <label
                htmlFor="service-min-quantity"
                className="block !text-sm !font-semibold"
              >
                أقل كمية للتبرع
              </label>
              <input
                id="service-min-quantity"
                name="minQuantity"
                className="w-full !rounded-xl border !p-3"
                type="number"
                min="1"
                value={form.minQuantity}
                onChange={handleChange}
              />
            </div>
            <div className="!space-y-2">
              <label
                htmlFor="service-category"
                className="block !text-sm !font-semibold"
              >
                تصنيف الخدمة
              </label>
              <select
                id="service-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={
                  Boolean(categoryError) ||
                  isLoadingCategories ||
                  categories.length === 0
                }
                className="w-full !rounded-xl border !p-3 disabled:bg-gray-100"
              >
                <option value="">اختر تصنيفًا</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {isLoadingCategories && (
                <p className="text-xs text-gray-500">جاري تحميل التصنيفات...</p>
              )}
              {categories.length === 0 && !categoryError && (
                <Link
                  to="/admin/categories"
                  className="inline-block text-sm font-semibold text-green-800 underline"
                >
                  أضف تصنيفًا أولًا
                </Link>
              )}
            </div>
          </div>
          <div className="!space-y-2">
            <label className="block !text-sm !font-semibold text-green-700">
              صورة الخدمة
            </label>
            <label
              htmlFor="service-image"
              className={`relative flex min-h-48 cursor-pointer items-center justify-center overflow-hidden !rounded-2xl border-2 border-dashed transition ${
                form.imagePreview
                  ? "!border-green-600 !bg-green-50"
                  : "!border-green-300 !bg-green-50 hover:!border-green-600 hover:!bg-green-50"
              }`}
            >
              {form.imagePreview ? (
                <>
                  <img
                    src={form.imagePreview}
                    alt="معاينة صورة الخدمة"
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute bottom-3 !rounded-lg !bg-green-900/70 !px-4 !py-2 !text-sm !text-white">
                    اضغط لتغيير الصورة
                  </span>
                </>
              ) : (
                <div className="text-center !p-5">
                  <div className="!mx-auto !mb-3 flex h-12 w-12 items-center justify-center !rounded-full !bg-green-100 !text-2xl !text-green-700">
                    +
                  </div>
                  <p className="!font-semibold !text-green-700">
                    اضغط لاختيار صورة الخدمة
                  </p>
                  <p className="!mt-1 !text-xs !text-gray-600">
                    PNG أو JPG بحجم مناسب
                  </p>
                </div>
              )}
              <input
                id="service-image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 !rounded-xl !bg-green-900 !px-6 !py-3 !font-bold !text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <LoaderCircle
                  className="h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                جاري الحفظ...
              </>
            ) : editingId ? (
              "حفظ التعديل"
            ) : (
              "إضافة خدمة"
            )}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="!mr-3 !rounded-xl border !px-6 !py-3"
            >
              إلغاء
            </button>
          )}
        </form>
      )}
      {!isCreatePage && <AllServiceAdmin serviceAdmin={serviceAdmin} />}
    </div>
  );
};

export default React.memo(ServicesPage);
