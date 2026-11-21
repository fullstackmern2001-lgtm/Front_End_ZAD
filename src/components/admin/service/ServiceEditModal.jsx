import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";

const ServiceEditModal = ({
  form,
  categories,
  categoryError,
  loading,
  onChange,
  onSubmit,
  onClose,
}) => (
  <Modal
    onClose={() => {
      if (!loading) onClose();
    }}
  >
    <h3 className="!mb-4 !text-xl !font-bold">تعديل الخدمة</h3>
    <form onSubmit={onSubmit} className="!space-y-3">
      {categoryError && (
        <p className="rounded-lg bg-red-50 !p-3 text-red-800" role="alert">
          {categoryError}
        </p>
      )}
      <label htmlFor="service-name" className="block !font-semibold">
        اسم الخدمة
      </label>
      <input
        id="service-name"
        name="name"
        className="w-full !rounded-xl border !p-3"
        placeholder="أدخل اسم الخدمة"
        value={form.name}
        onChange={onChange}
      />

      <label htmlFor="service-category-edit" className="block !font-semibold">
        تصنيف الخدمة
      </label>
      <select
        id="service-category-edit"
        name="category"
        className="w-full !rounded-xl border !p-3"
        value={form.category}
        onChange={onChange}
        required
        disabled={Boolean(categoryError) || categories.length === 0}
      >
        <option value="">اختر تصنيفًا</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      <label htmlFor="service-description" className="block !font-semibold">
        وصف الخدمة
      </label>
      <textarea
        id="service-description"
        name="description"
        className="w-full !rounded-xl border !p-3"
        rows="4"
        placeholder="أدخل وصف الخدمة"
        value={form.description}
        onChange={onChange}
      />

      <label htmlFor="service-price" className="block !font-semibold">
        سعر الخدمة
      </label>
      <input
        id="service-price"
        name="price"
        className="w-full !rounded-xl border !p-3"
        type="number"
        min="0"
        placeholder="أدخل سعر الخدمة"
        value={form.price}
        onChange={onChange}
      />

      <label htmlFor="service-min-quantity" className="block !font-semibold">
        أقل كمية للتبرع
      </label>
      <input
        id="service-min-quantity"
        name="minQuantity"
        className="w-full !rounded-xl border !p-3"
        type="number"
        min="1"
        placeholder="أدخل أقل كمية للتبرع"
        value={form.minQuantity}
        onChange={onChange}
      />

      <div className="!space-y-2">
        <span className="block !font-semibold">صورة الخدمة</span>
        {form.imagePreview ? (
          <img
            src={form.imagePreview}
            alt={`صورة ${form.name}`}
            className="h-48 w-full !rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center !rounded-xl border border-dashed text-gray-500">
            لم يتم اختيار صورة
          </div>
        )}
        <label
          htmlFor="service-image"
          className="inline-block cursor-pointer !rounded-lg border border-green-800 !px-4 !py-2 text-sm font-semibold text-green-900 hover:bg-green-50"
        >
          تغيير الصورة
        </label>
        <input
          id="service-image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onChange}
          className="sr-only"
        />
      </div>
      <div className="flex justify-end gap-3 !pt-3">
        <button
          type="button"
          onClick={onClose}
          className="!rounded-xl border !px-5 !py-2"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 !rounded-xl !bg-green-900 !px-5 !py-2 !text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <LoaderCircle
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
              جاري الحفظ...
            </>
          ) : (
            "حفظ التعديل"
          )}
        </button>
      </div>
    </form>
  </Modal>
);

export default React.memo(ServiceEditModal);
