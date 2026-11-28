import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewServices from "./reviewServices";

// ================= CREATE =================
export const createReview = createAsyncThunk(
  "review/createReview",
  async (data, thunkAPI) => {
    try {
      const res = await reviewServices.addReview(data);
      return res.data.data;
    } catch (error) {
      // بدل ارسال error.response كامل
      const message =
        error?.response?.data?.message || // لو عندك رسالة عامة
        error?.response?.data?.errors || // لو validation errors
        "Create Review failed";

      return thunkAPI.rejectWithValue(message);
    }
  },
);

// ================= GET =================
export const getReviews = createAsyncThunk(
  "review/getReviews",
  async (serviceId, thunkAPI) => {
    try {
      const res = await reviewServices.getReviewsForService(serviceId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Get Reviews failed",
      );
    }
  },
);

// ================= DELETE =================
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (id, thunkAPI) => {
    try {
      await reviewServices.deleteReview(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Delete Review failed",
      );
    }
  },
);

// ================= UPDATE =================
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await reviewServices.updateReview(id, data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Update Review failed",
      );
    }
  },
);
