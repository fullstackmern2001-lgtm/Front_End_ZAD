import { createSlice } from "@reduxjs/toolkit";
import {
  addServiceToCart,
  getUserCart,
  removeItemFromCart,
  updateCartItemQty,
  clearUserCart,
} from "./cartThunk";
import { logout } from "../auth/authSlice";

const initialState = {
  cart: null,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cart = null;
      state.isLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.cart = null;
        state.isLoading = false;
        state.error = null;
      })
      // =========================ADD==================================

      .addCase(addServiceToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addServiceToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addServiceToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // =========================GET==================================
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // =========================REMOVE==================================
      .addCase(removeItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // =========================UPDATE==================================
      .addCase(updateCartItemQty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // =========================CLEAR==================================
      .addCase(clearUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = null;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
