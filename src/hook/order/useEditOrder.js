import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOrderDeliveredThunk } from "../../store/features/order/OrderThunks";
import notify from "../useNotifaction";
import { handleError } from "../../components/utils/handleError";

const useEditOrder = (order, onClose) => {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [isDelivered, setIsDelivered] = useState(order.isDelivered);

  const handleSave = async () => {
    try {
      if (isDelivered !== order.isDelivered) {
        setIsSaving(true);
        await dispatch(updateOrderDeliveredThunk(order._id)).unwrap();
      }

      notify("تم تحديث حالة الطلب بنجاح", "success");
      onClose();
    } catch (error) {
      handleError(error, "general");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = (event) => {
    setIsDelivered(event.target.value === "true");
  };
  const handleClose = () => {
    if (!isSaving) onClose();
  };

  return { isSaving, isDelivered, handleSave, handleStatusChange, handleClose };
};

export default useEditOrder;
