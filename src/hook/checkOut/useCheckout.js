import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  capturePayPalCheckoutThunk,
  cancelPayPalCheckoutThunk,
  checkoutSessionThunk,
} from "../../store/features/order/OrderThunks";
import { getUserCart } from "../../store/features/cart/cartThunk";
import notify from "../../hook/useNotifaction";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cart } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const idempotencyRef = useRef(null);
  const paypalCaptureRef = useRef(null);

  useEffect(() => {
    const paypalStatus = searchParams.get("paypal");
    const paypalOrderId = searchParams.get("token");

    if (paypalStatus === "cancel") {
      if (paypalOrderId) {
        dispatch(cancelPayPalCheckoutThunk(paypalOrderId));
      }
      notify("أُلغيت عملية PayPal ولم يُسجل الدفع", "warn");
      return;
    }
    if (
      paypalStatus !== "return" ||
      !paypalOrderId ||
      paypalCaptureRef.current === paypalOrderId
    ) {
      return;
    }

    paypalCaptureRef.current = paypalOrderId;
    dispatch(capturePayPalCheckoutThunk(paypalOrderId))
      .unwrap()
      .then(() => {
        navigate("/dashpord/orders?gateway=paypal&status=success", {
          replace: true,
        });
      })
      .catch((err) => {
        paypalCaptureRef.current = null;
        notify(
          getApiErrorMessage(err, "تعذر تأكيد دفعة PayPal"),
          "error",
        );
      });
  }, [dispatch, navigate, searchParams]);

  const handleProceedPayment = async () => {
    const cartId = cart?._id;

    if (!["card", "paypal"].includes(paymentMethod)) {
      notify("يرجى اختيار وسيلة دفع صحيحة", "warn");
      return;
    }

    if (!cartId || !cart?.cartItems?.length) {
      notify("السلة فارغة", "warn");
      return;
    }

    try {
      setLoading(true);
      const cartVersion = `${cartId}:${cart.revision ?? 0}:${paymentMethod}`;
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
          paymentMethod,
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
        getApiErrorMessage(
          err,
          paymentMethod === "paypal"
            ? "فشل بدء عملية الدفع عبر PayPal"
            : "فشل بدء عملية الدفع بالفيزا",
        ),
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
