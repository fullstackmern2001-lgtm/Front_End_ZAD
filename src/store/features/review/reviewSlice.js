import { createSlice } from "@reduxjs/toolkit";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./reviewThunk";

const initialState = {
  reviews: { data: [], results: 0, paginationResult: {} },
  isLoading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ======================GET REVIEWS=========================================
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ========================= CREATE REVIEW===============================================
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.reviews.data)) {
          state.reviews.data.unshift(action.payload);
        } else {
          state.reviews.data = [action.payload];
        }
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // =====================UPDATE REVIEW==================================================
      .addCase(updateReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.reviews.data.findIndex(
          (rev) => rev._id === action.payload._id,
        );
        if (index !== -1) {
          state.reviews.data[index] = action.payload;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // =================DELETE REVIEW=======================================================
      .addCase(deleteReview.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.data = state.reviews.data.filter(
          (rev) => rev._id !== action.payload,
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
