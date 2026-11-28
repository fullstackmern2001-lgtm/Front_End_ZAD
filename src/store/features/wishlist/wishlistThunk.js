import { createAsyncThunk } from "@reduxjs/toolkit";
import * as wishlistServices from "./wishlistServices";

// Toggle wishlist
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (serviceId, thunkAPI) => {
    try {
      const res = await wishlistServices.toggleWishlist(serviceId);
      return thunkAPI.getState().auth.isAuth ? res.data.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Toggle wishlist failed",
      );
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);

// Get wishlist
export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, thunkAPI) => {
    try {
      const res = await wishlistServices.getWishlist();
      return thunkAPI.getState().auth.isAuth ? res.data.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Get wishlist failed",
      );
    }
  },
  {
    condition: (_, { getState }) => getState().auth.isAuth,
  },
);
