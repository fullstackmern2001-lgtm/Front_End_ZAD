import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";
import useProofForm from "../../../hook/proof/useProofForm";

const ProofFormModal = ({ proof, loading, onSave, onClose }) => {
  const {
    title,
    description,
    preview,
    image,
    handleImageChange,
    handleTitleChange,
    handleDescriptionChange,
    handleSubmit,
    handleClose,
  } = useProofForm(proof, loading, onSave, onClose);

  return (
    <Modal onClose={handleClose}>
      <h2 className="!mb-5 text-xl !font-bold text-[#174b5a]">
        {proof ? "تعديل التوثيق" : "إضافة توثيق جديد"}
      </h2>
      <form onSubmit={handleSubmit} className="!space-y-4" dir="rtl">
        <div>
          <label htmlFor="proof-title" className="mb-1 block font-semibold">
            العنوان الرئيسي
          </label>
          <input
            id="proof-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            minLength={3}
            maxLength={150}
            required
            placeholder="أدخل عنوان التوثيق"
            className="w-full rounded-xl border border-[#dce8e7] !px-4 !py-3"
          />
        </div>
        <div>
          <label
            htmlFor="proof-description"
            className="mb-1 block font-semibold"
          >
            وصف التوثيق
          </label>
          <textarea
            id="proof-description"
            value={description}
            onChange={handleDescriptionChange}
            minLength={3}
            maxLength={5000}
            rows={5}
            required
            placeholder="اكتب وصفًا يوضح المشروع وأثره"
            className="w-full rounded-xl border border-[#dce8e7] !px-4 !py-3"
          />
        </div>
        <div className="!space-y-2">
          <span className="block font-semibold">
            صورة التوثيق {proof ? "(اختياري عند التعديل)" : ""}
          </span>
          {preview ? (
            <img
              src={preview}
              alt={`معاينة ${title || "التوثيق"}`}
              className="h-52 w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-[#a8dce5] text-gray-500">
              لم يتم اختيار صورة
            </div>
          )}
          <label
            htmlFor="proof-image"
            className="inline-block cursor-pointer rounded-lg border border-[#287c91] !px-4 !py-2 font-semibold text-[#174b5a] hover:bg-[#f5f8f7]"
          >
            {preview ? "تغيير الصورة" : "اختيار صورة"}
          </label>
          <input
            id="proof-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!proof && !image}
            className="sr-only"
          />
        </div>
        <div className="flex justify-end gap-3 !pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl border !px-5 !py-2 disabled:opacity-60"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#174b5a] !px-5 !py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                جاري الحفظ...
              </>
            ) : proof ? (
              "حفظ التعديل"
            ) : (
              "إضافة التوثيق"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default React.memo(ProofFormModal);
