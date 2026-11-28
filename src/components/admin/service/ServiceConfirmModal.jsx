import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";

const ServiceConfirmModal = ({ loading, onConfirm, onClose }) => (
  <Modal onClose={() => {
    if (!loading) onClose();
  }}>
    <h3 className="!mb-3 !text-xl !font-bold">تأكيد الحذف</h3>
    <p className="!mb-6 text-gray-700">
      هل أنت متأكد من حذف هذه الخدمة؟ لا يمكن التراجع عن العملية.
    </p>
    <div className="flex justify-end gap-3">
      <button
        onClick={onClose}
        disabled={loading}
        className="!rounded-xl bg-green-200 !px-5 !py-2"
      >
        إلغاء
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex items-center gap-2 !rounded-xl !bg-red-600 !px-5 !py-2 !text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            جاري الحذف...
          </>
        ) : (
          "نعم، احذف"
        )}
      </button>
    </div>
  </Modal>
);

export default React.memo(ServiceConfirmModal);
