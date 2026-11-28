import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";

const ProofDeleteModal = ({ loading, onConfirm, onClose }) => (
  <Modal onClose={() => {
    if (!loading) onClose();
  }}>
    <h2 className="!mb-3 text-xl !font-bold text-[#174b5a]">حذف التوثيق</h2>
    <p className="!mb-6 text-gray-700">
      هل أنت متأكد من حذف هذا التوثيق؟ لا يمكن التراجع عن العملية.
    </p>
    <div className="flex justify-end gap-3">
      <button
        type="button"
        onClick={onClose}
        disabled={loading}
        className="rounded-xl border !px-5 !py-2 disabled:opacity-60"
      >
        إلغاء
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-red-600 !px-5 !py-2 font-semibold text-white disabled:opacity-60"
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

export default React.memo(ProofDeleteModal);
