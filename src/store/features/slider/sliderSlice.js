import { createSlice } from "@reduxjs/toolkit";
import {
  createSlider,
  getSliders,
  updateSlider,
  deleteSlider,
} from "./sliderThunk";
const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
    isFetching: false,
    isMutating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getSliders.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getSliders.fulfilled, (state, action) => {
        state.isFetching = false;
        state.sliders = action.payload.data;
      })
      .addCase(getSliders.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createSlider.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(createSlider.fulfilled, (state, action) => {
        state.isMutating = false;
        state.sliders.push(action.payload);
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateSlider.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(updateSlider.fulfilled, (state, action) => {
        state.isMutating = false;
        const index = state.sliders.findIndex(
          (slider) => slider._id === action.payload._id,
        );
        if (index !== -1) state.sliders[index] = action.payload;
      })
      .addCase(updateSlider.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteSlider.pending, (state) => {
        state.isMutating = true;
        state.error = null;
      })
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.isMutating = false;
        state.sliders = state.sliders.filter((s) => s._id !== action.meta.arg);
      })
      .addCase(deleteSlider.rejected, (state, action) => {
        state.isMutating = false;
        state.error = action.payload;
      });
  },
});

export default sliderSlice.reducer;
