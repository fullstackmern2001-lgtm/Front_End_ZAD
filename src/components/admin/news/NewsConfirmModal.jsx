import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";

const NewsConfirmModal = ({ type, loading, onConfirm, onClose }) => {
  const isDelete = type === "delete";

  return (
    <Modal onClose={() => {
      if (!loading) onClose();
    }}>
      <h3 className="!mb-3 !text-xl !font-bold">
        {isDelete ? "تأكيد حذف الخبر" : "تأكيد تعديل الخبر"}
      </h3>
      <p className="!mb-6 !text-gray-700">
        {isDelete
          ? "هل أنت متأكد من حذف هذا الخبر؟ لا يمكن التراجع عن العملية."
          : "هل أنت متأكد من حفظ التعديلات على هذا الخبر؟"}
      </p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => {
            if (!loading) onClose();
          }}
          disabled={loading}
          className="!rounded-xl !bg-green-200 !px-5 !py-2"
        >
          إلغاء
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className={`!rounded-xl !px-5 !py-2 !text-white ${
            isDelete ? "!bg-red-600" : "!bg-green-900"
          }`}
        >
          {loading
            ? <><LoaderCircle className="!mr-2 inline h-5 w-5 animate-spin" aria-hidden="true" />جاري التنفيذ...</>
            : isDelete
              ? "نعم، احذف"
              : "نعم، احفظ التعديل"}
        </button>
      </div>
    </Modal>
  );
};

export default React.memo(NewsConfirmModal);
