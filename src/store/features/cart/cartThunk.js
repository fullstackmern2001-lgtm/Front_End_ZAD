import { createAsyncThunk } from "@reduxjs/toolkit";
import * as cartServices from "./cartServices";

// ADD TO CART
export const addServiceToCart = createAsyncThunk(
  "cart/addServiceToCart",
  async (data, thunkAPI) => {
    try {
      const res = await cartServices.addToCart(data);
      return thunkAPI.getState().auth.isAuth ? res.data.data : null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error);
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);

// GET CART
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, thunkAPI) => {
    try {
      const res = await cartServices.getCart();
      return thunkAPI.getState().auth.isAuth ? res.data.data : null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (id, thunkAPI) => {
    try {
      const res = await cartServices.removeCartItem(id);
      return thunkAPI.getState().auth.isAuth ? res.data.data : null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);

// UPDATE QUANTITY
export const updateCartItemQty = createAsyncThunk(
  "cart/updateCartItemQty",
  async ({ id, quantity }, thunkAPI) => {
    try {
      const res = await cartServices.updateCartItem(id, { quantity });
      return thunkAPI.getState().auth.isAuth ? res.data.data : null;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);

// CLEAR CART
export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async (_, thunkAPI) => {
    try {
      await cartServices.clearCart();
      return thunkAPI.getState().auth.isAuth;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);
