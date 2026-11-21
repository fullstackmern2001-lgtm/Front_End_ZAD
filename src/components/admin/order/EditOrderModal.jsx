import Modal from "../Modal";
import React from "react";
import { LoaderCircle } from "lucide-react";
import useEditOrder from "../../../hook/order/useEditOrder";
const EditOrderModal = ({ order, onClose }) => {
  const {
    isSaving,
    isDelivered,
    handleSave,
    handleStatusChange,
    handleClose,
  } = useEditOrder(order, onClose);

  return (
    <Modal onClose={handleClose}>
      <h3 className="!font-bold !text-xl !mb-4">تعديل حالة الطلب</h3>

      <div className="!space-y-4">
        <p className="!font-bold">
          رقم الطلب:{" "}
          <span dir="ltr" className="inline-block">
            {order._id}
          </span>
        </p>

        <div>
          <label className="!text-sm !font-semibold">حالة تنفيذ الخدمة</label>

          <select
            className="w-full !border !rounded-xl !px-3 !py-2 !mt-1"
            value={isDelivered.toString()}
            onChange={handleStatusChange}
          >
            <option value="false">قيد التنفيذ</option>
            <option value="true">تم التنفيذ</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 !mt-6">
        <button
          onClick={handleClose}
          disabled={isSaving}
          className="!px-5 !py-2 border !rounded-xl hover:!bg-green-100 transition"
        >
          إلغاء
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="!px-5 !py-2 !bg-green-900 !text-white !rounded-xl hover:!bg-green-700 transition"
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              جاري الحفظ...
            </span>
          ) : "حفظ"}
        </button>
      </div>
    </Modal>
  );
};

export default React.memo(EditOrderModal);
