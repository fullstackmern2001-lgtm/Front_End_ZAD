import { createSlice } from "@reduxjs/toolkit";
import {
  getUserOrdersThunk,
  updateOrderDeliveredThunk,
  checkoutSessionThunk,
} from "./OrderThunks";

const initialState = {
  orders: [],
  stripeUrl: null,
  isLoading: false,
  isUpdating: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== GET ORDERS =====
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ===== UPDATE DELIVERED =====
      .addCase(updateOrderDeliveredThunk.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateOrderDeliveredThunk.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderDeliveredThunk.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })
      // ===== STRIPE CHECKOUT =====
      .addCase(checkoutSessionThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkoutSessionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stripeUrl = action.payload;
      })
      .addCase(checkoutSessionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
