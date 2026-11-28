import api from "../../baseUrl";

// جلب جميع الأوردرات الخاصة بالمستخدم
export const getUserOrders = () => api.get(`/order`);

// تحديث التوصيل (admin)
export const updateOrderDelivered = (id) => api.put(`/order/${id}/deliver`);

// Checkout Session (Stripe / PayPal)
export const checkoutSession = (cartId, idempotencyKey, paymentMethod = "card") =>
  api.post(
    `/order/checkout-session/${cartId}`,
    { paymentMethod },
    {
      headers: { "Idempotency-Key": idempotencyKey },
    },
  );

export const getCheckoutStatus = (sessionId) =>
  api.get(`/order/checkout-session/${encodeURIComponent(sessionId)}/status`);

export const capturePayPalCheckout = (orderId) =>
  api.post(`/order/paypal/capture/${encodeURIComponent(orderId)}`);

export const cancelPayPalCheckout = (orderId) =>
  api.post(`/order/paypal/cancel/${encodeURIComponent(orderId)}`);
