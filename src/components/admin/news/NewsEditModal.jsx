import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";

const NewsEditModal = ({ form, loading, onChange, onSubmit, onClose }) => (
  <Modal onClose={() => {
    if (!loading) onClose();
  }}>
    <h3 className="!mb-4 !text-xl !font-bold">تعديل الخبر</h3>
    <form onSubmit={onSubmit} className="!space-y-3">
      <label htmlFor="news-edit-title" className="block !font-semibold">
        عنوان الخبر
      </label>
      <input
        id="news-edit-title"
        name="title"
        className="w-full !rounded-xl border !p-3"
        placeholder="أدخل عنوان الخبر"
        value={form.title}
        onChange={onChange}
      />
      <label htmlFor="news-edit-description" className="block !font-semibold">
        وصف الخبر
      </label>
      <textarea
        id="news-edit-description"
        name="description"
        className="w-full !rounded-xl border !p-3"
        rows="5"
        placeholder="أدخل وصف الخبر"
        value={form.description}
        onChange={onChange}
      />
      <label htmlFor="news-edit-published-at" className="block !font-semibold">
        تاريخ النشر
      </label>
      <input
        id="news-edit-published-at"
        name="publishedAt"
        type="date"
        className="w-full !rounded-xl border !p-3"
        value={form.publishedAt}
        onChange={onChange}
      />
      <div className="!space-y-2">
        <span className="block !font-semibold">صورة الخبر (اختياري)</span>
        {form.imagePreview ? (
          <img
            src={form.imagePreview}
            alt={`صورة ${form.title}`}
            className="h-48 w-full !rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center !rounded-xl border border-dashed text-gray-500">
            لم يتم اختيار صورة
          </div>
        )}
        <label
          htmlFor="news-edit-image"
          className="inline-block cursor-pointer !rounded-lg border border-green-800 !px-4 !py-2 text-sm font-semibold text-green-900 hover:bg-green-50"
        >
          تغيير الصورة
        </label>
        <input
          id="news-edit-image"
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
          onClick={() => {
            if (!loading) onClose();
          }}
          disabled={loading}
          className="!rounded-xl border !px-5 !py-2"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 !rounded-xl !bg-green-900 !px-5 !py-2 !text-white disabled:opacity-70"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              جاري الحفظ...
            </>
          ) : (
            "متابعة التعديل"
          )}
        </button>
      </div>
    </form>
  </Modal>
);

export default React.memo(NewsEditModal);
