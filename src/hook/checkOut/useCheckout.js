import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutSessionThunk } from "../../store/features/order/OrderThunks";
import { getUserCart } from "../../store/features/cart/cartThunk";
import notify from "../../hook/useNotifaction";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useCheckout = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const idempotencyRef = useRef(null);

  const handleProceedPayment = async () => {
    const cartId = cart?._id;

    if (paymentMethod !== "credit") {
      notify("تقبل النظام الدفع عبر الفيزا فقط", "warn");
      return;
    }

    if (!cartId) {
      notify("السلة فارغة", "warn");
      return;
    }

    try {
      setLoading(true);
      const cartVersion = `${cartId}:${cart.revision ?? 0}`;
      if (idempotencyRef.current?.cartVersion !== cartVersion) {
        if (typeof crypto?.randomUUID !== "function") {
          throw new Error("تعذر بدء عملية دفع آمنة في هذا المتصفح");
        }
        idempotencyRef.current = {
          cartVersion,
          key: crypto.randomUUID(),
        };
      }

      const url = await dispatch(
        checkoutSessionThunk({
          cartId,
          idempotencyKey: idempotencyRef.current.key,
        }),
      ).unwrap();
      window.location.href = url;
    } catch (err) {
      if (err?.status === 409) {
        idempotencyRef.current = null;
        try {
          await dispatch(getUserCart()).unwrap();
        } catch (refreshError) {
          notify(
            getApiErrorMessage(refreshError, "تعذر تحديث السلة"),
            "error",
          );
        }
      }
      notify(
        getApiErrorMessage(err, "فشل الدفع بالفيزا"),
        "error",
      );
      setLoading(false);
    }
  };

  return {
    loading,
    paymentMethod,
    setPaymentMethod,
    subtotal: cart?.totalCartPrice || 0,
    handleProceedPayment,
  };
};

export default useCheckout;
