import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";

const AccountActionModal = ({ account, action, loading, onConfirm, onClose }) => {
  const isDelete = action === "delete";
  const isActive = action === "activate";
  const title = isDelete
    ? "حذف الحساب"
    : isActive
      ? "إعادة تفعيل الحساب"
      : "تعليق الحساب";
  const description = isDelete
    ? `هل أنت متأكد من حذف حساب ${account.firstName} ${account.lastName}؟ لا يمكن التراجع عن هذا الإجراء.`
    : isActive
      ? `هل تريد إعادة تفعيل حساب ${account.firstName} ${account.lastName}؟`
      : `هل تريد تعليق حساب ${account.firstName} ${account.lastName}؟ سيتم إنهاء جلساته الحالية.`;

  return (
    <Modal
      onClose={() => {
        if (!loading) onClose();
      }}
    >
      <h2 className="!mb-3 text-xl !font-bold text-[#174b5a]">{title}</h2>
      <p className="!mb-6 text-gray-700">{description}</p>
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
          className={`flex items-center gap-2 rounded-xl !px-5 !py-2 font-semibold text-white disabled:opacity-60 ${
            isDelete ? "bg-red-600" : isActive ? "bg-green-700" : "bg-amber-600"
          }`}
        >
          {loading ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              جاري التنفيذ...
            </>
          ) : isDelete ? (
            "نعم، احذف"
          ) : isActive ? (
            "إعادة التفعيل"
          ) : (
            "تعليق الحساب"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default React.memo(AccountActionModal);
