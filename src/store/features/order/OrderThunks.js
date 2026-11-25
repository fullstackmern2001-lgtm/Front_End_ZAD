import { createAsyncThunk } from "@reduxjs/toolkit";
import * as orderService from "./OrderService";

export const getUserOrdersThunk = createAsyncThunk(
  "order/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const res = await orderService.getUserOrders();
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || "تعذر تحميل الطلبات",
      );
    }
  },
);

// تحديث التوصيل
export const updateOrderDeliveredThunk = createAsyncThunk(
  "order/updateDelivered",
  async (id, thunkAPI) => {
    try {
      const res = await orderService.updateOrderDelivered(id);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || "تعذر تعديل حالة التوصيل",
      );
    }
  },
);

export const checkoutSessionThunk = createAsyncThunk(
  "order/checkoutSession",
  async ({ cartId, idempotencyKey, paymentMethod = "card" }, thunkAPI) => {
    try {
      const res = await orderService.checkoutSession(
        cartId,
        idempotencyKey,
        paymentMethod,
      );
      return res.data.session.url; // بيرجع الـ URL من بوابة الدفع
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status,
        message:
          error?.response?.data?.message ||
          error.message ||
          "تعذر بدء عملية الدفع",
      });
    }
  },
);

export const checkoutStatusThunk = createAsyncThunk(
  "order/checkoutStatus",
  async (sessionId, thunkAPI) => {
    try {
      const res = await orderService.getCheckoutStatus(sessionId);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data || error.message || "تعذر التحقق من حالة الدفع",
      );
    }
  },
);

export const capturePayPalCheckoutThunk = createAsyncThunk(
  "order/capturePayPalCheckout",
  async (orderId, thunkAPI) => {
    try {
      const res = await orderService.capturePayPalCheckout(orderId);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status,
        message:
          error?.response?.data?.message ||
          error.message ||
          "تعذر تأكيد دفع PayPal",
      });
    }
  },
);

export const cancelPayPalCheckoutThunk = createAsyncThunk(
  "order/cancelPayPalCheckout",
  async (orderId, thunkAPI) => {
    try {
      const res = await orderService.cancelPayPalCheckout(orderId);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error?.response?.status,
        message:
          error?.response?.data?.message ||
          error.message ||
          "تعذر تحديث حالة دفع PayPal",
      });
    }
  },
);
