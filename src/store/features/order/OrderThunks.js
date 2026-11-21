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
  async ({ cartId, idempotencyKey }, thunkAPI) => {
    try {
      const res = await orderService.checkoutSession(cartId, idempotencyKey);
      return res.data.session.url; // بيرجع الـ URL من Stripe
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
