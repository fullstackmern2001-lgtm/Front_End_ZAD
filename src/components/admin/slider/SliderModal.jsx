import React from "react";
import { LoaderCircle } from "lucide-react";

const SliderModal = ({
  open,
  onClose,
  form,
  onFormChange,
  onImageChange,
  onSubmit,
  onViewAll,
  isSubmitting = false,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-green-900/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow !p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {form._id ? "تعديل السلايدر" : "إضافة سلايدر"}
        </h3>

        <div className="!mb-3">
          <label htmlFor="slider-name" className="mb-1 block font-semibold">
            اسم السلايدر
          </label>
          <input
            id="slider-name"
            type="text"
            name="name"
            placeholder="أدخل اسم السلايدر"
            value={form.name}
            onChange={onFormChange}
            className="w-full border rounded-xl px-4 py-2"
          />
        </div>
        <div className="!mb-3">
          <label htmlFor="slider-description" className="mb-1 block font-semibold">
            وصف السلايدر
          </label>
          <input
            id="slider-description"
            type="text"
            name="des"
            placeholder="أدخل وصف السلايدر"
            value={form.des}
            onChange={onFormChange}
            className="w-full border rounded-xl px-4 py-2"
          />
        </div>

        <div className="!mb-3 space-y-2">
          <span className="block font-semibold">صورة السلايدر</span>
          {form.preview ? (
            <img
              src={form.preview}
              alt={`معاينة ${form.name || "السلايدر"}`}
              className="w-full h-48 object-cover rounded-xl"
            />
          ) : (
            <div className="flex h-48 w-full items-center justify-center rounded-xl border border-dashed text-gray-500">
              لم يتم اختيار صورة
            </div>
          )}
          <label
            htmlFor="slider-image"
            className="inline-block cursor-pointer rounded-lg border border-green-800 px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-50"
          >
            {form.preview ? "تغيير الصورة" : "اختيار صورة"}
          </label>
          <input
            id="slider-image"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="sr-only"
          />
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              disabled={isSubmitting}
              className="rounded-full border px-4 py-2"
            >
              عرض كل السلايدرز
            </button>
          )}
          <div className="flex gap-3">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-full bg-green-900 text-white"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="mr-2 inline h-5 w-5 animate-spin" aria-hidden="true" />
                جارٍ الحفظ...
              </>
            ) : form._id ? "تحديث" : "إضافة"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-full border"
          >
            إلغاء
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SliderModal);
