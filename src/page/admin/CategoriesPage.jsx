import React from "react";
import { LoaderCircle, Plus, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "../../components/admin/Modal";
import useCategoriesAdmin from "../../hook/category/useCategoriesAdmin";

const CategoriesPage = () => {
  const {
    isFormPage,
    categories,
    form,
    editingCategory,
    deleteCategory,
    isLoading,
    isSaving,
    isDeleting,
    loadError,
    formError,
    loadCategories,
    handleChange,
    handleSave,
    handleDelete,
    handleEdit,
    setDeleteCategory,
    closeDelete,
  } = useCategoriesAdmin();

  return (
    <section className="!space-y-6" dir="rtl">
      <header className="flex flex-col gap-4 !rounded-2xl border !border-[#ddf1f2] !bg-white !p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl !font-bold text-[#174b5a]">
          {isFormPage
            ? editingCategory
              ? "تعديل تصنيف"
              : "إضافة تصنيف"
            : "التصنيفات"}
        </h1>
        <Link
          to={isFormPage ? "/admin/categories" : "/admin/categories/new"}
          className="inline-flex items-center justify-center gap-2 !rounded-xl border !border-[#174b5a] !px-5 !py-3 font-semibold text-[#174b5a] transition hover:!bg-[#f5f8f7]"
        >
          {isFormPage ? (
            "عرض كل التصنيفات"
          ) : (
            <>
              <Plus className="h-5 w-5" aria-hidden="true" />
              إضافة تصنيف
            </>
          )}
        </Link>
      </header>

      {formError && (
        <div className="rounded-xl bg-red-50 !p-4 text-red-800" role="alert">
          {formError}
        </div>
      )}

      {isFormPage ? (
        <form
          onSubmit={handleSave}
          className="!space-y-3 !rounded-2xl bg-white !p-5 shadow"
        >
          <div className="!space-y-2">
            <label
              htmlFor="category-name"
              className="block !text-sm !font-semibold"
            >
              اسم التصنيف
            </label>
            <input
              id="category-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              maxLength={80}
              required
              className="w-full !rounded-xl border !p-3"
            />
          </div>
          <div className="!space-y-2">
            <label className="block !text-sm !font-semibold text-green-700">
              صورة التصنيف
            </label>
            <label
              htmlFor="category-image"
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
                    alt={`معاينة صورة ${form.name || "التصنيف"}`}
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
                    اضغط لاختيار صورة التصنيف
                  </p>
                  <p className="!mt-1 !text-xs !text-gray-600">
                    JPEG أو PNG أو WEBP، وبحجم لا يتجاوز 5MB
                  </p>
                </div>
              )}
              <input
                id="category-image"
                name="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {editingCategory && (
              <p className="text-xs text-gray-500">
                اترك الصورة الحالية كما هي، أو اختر صورة جديدة لتغييرها.
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 !rounded-xl !bg-green-900 !px-6 !py-3 !font-bold !text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <LoaderCircle
                    className="h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  جاري الحفظ...
                </>
              ) : editingCategory ? (
                "حفظ التعديل"
              ) : (
                "إضافة تصنيف"
              )}
            </button>
            <Link
              to="/admin/categories"
              className="!rounded-xl border !px-6 !py-3 font-semibold"
            >
              إلغاء
            </Link>
          </div>
        </form>
      ) : (
        <>
          {loadError && (
            <div
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-red-50 !p-4 text-red-800"
              role="alert"
            >
              <span>{loadError}</span>
              <button
                type="button"
                onClick={loadCategories}
                disabled={isLoading}
                className="rounded-lg border border-red-300 !px-4 !py-2 font-semibold"
              >
                إعادة المحاولة
              </button>
            </div>
          )}

          {isLoading ? (
            <div
              className="flex items-center justify-center gap-2 !py-10 text-green-800"
              role="status"
            >
              <LoaderCircle
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              جاري تحميل التصنيفات...
            </div>
          ) : !loadError && categories.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <article
                  key={category._id}
                  className="overflow-hidden rounded-2xl border border-[#ddf1f2] bg-white shadow-sm"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="!p-4">
                    <h2 className="flex items-center gap-2 text-lg !font-bold text-[#174b5a]">
                      <Tag size={18} aria-hidden="true" />
                      {category.name}
                    </h2>
                    <div className="!mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                        disabled={isDeleting}
                        className="flex-1 rounded-lg bg-[#174b5a] !px-3 !py-2 font-semibold text-white disabled:opacity-60"
                      >
                        تعديل
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteCategory(category)}
                        disabled={isDeleting}
                        className="flex-1 rounded-lg bg-red-600 !px-3 !py-2 font-semibold text-white disabled:opacity-60"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            !loadError && (
              <div className="rounded-2xl bg-white !py-14 text-center text-gray-600 shadow">
                لا توجد تصنيفات بعد. ابدأ بإضافة أول تصنيف.
              </div>
            )
          )}
        </>
      )}

      {deleteCategory && (
        <Modal
          onClose={closeDelete}
        >
          <h2 className="!mb-3 text-xl !font-bold">تأكيد حذف التصنيف</h2>
          <p className="!mb-6 text-gray-700">
            هل أنت متأكد من حذف تصنيف «{deleteCategory.name}»؟ لا يمكن حذف
            التصنيف إذا كانت هناك خدمات مرتبطة به.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeDelete}
              disabled={isDeleting}
              className="!rounded-xl border !px-5 !py-2"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 !rounded-xl bg-red-600 !px-5 !py-2 text-white disabled:opacity-60"
            >
              {isDeleting && (
                <LoaderCircle
                  className="h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
              )}
              {isDeleting ? "جاري الحذف..." : "نعم، احذف"}
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default React.memo(CategoriesPage);
