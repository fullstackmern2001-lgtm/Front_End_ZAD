import api from "../../baseUrl";

// جلب جميع الأوردرات الخاصة بالمستخدم
export const getUserOrders = () => api.get(`/order`);

// تحديث التوصيل (admin)
export const updateOrderDelivered = (id) => api.put(`/order/${id}/deliver`);

// Stripe Checkout Session
export const checkoutSession = (cartId, idempotencyKey) =>
  api.post(`/order/checkout-session/${cartId}`, null, {
    headers: { "Idempotency-Key": idempotencyKey },
  });
