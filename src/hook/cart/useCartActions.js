import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQty,
  clearUserCart,
} from "../../store/features/cart/cartThunk";
import notify from "../../hook/useNotifaction";

const useCartActions = () => {
  const dispatch = useDispatch();

  const updateQty = async (itemId, value, minQuantity = 1) => {
    const quantity = Number(value);
    if (!Number.isInteger(quantity) || quantity < minQuantity) {
      notify(`أقل كمية لهذه الخدمة هي ${minQuantity}`, "warn");
      return false;
    }

    try {
      await dispatch(
        updateCartItemQty({ id: itemId, quantity }),
      ).unwrap();
      notify("تم تحديث الكمية", "success");
      return true;
    } catch (error) {
      notify(error || "تعذر تحديث الكمية", "error");
      return false;
    }
  };

  const removeItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
    notify("تم حذف الخدمة من السلة", "success");
  };

  const clearCart = () => {
    dispatch(clearUserCart());
    notify("تم مسح السله بالكامل", "success");
  };

  return { updateQty, removeItem, clearCart };
};

export default useCartActions;
