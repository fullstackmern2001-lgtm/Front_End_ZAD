import { createAsyncThunk } from "@reduxjs/toolkit";
import * as sliderServices from "./sliderSevices";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessage";

/* =========================
   Get All Sliders
========================= */
export const getSliders = createAsyncThunk(
  "slider/getSliders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await sliderServices.getCSliders();
      return data;
    } catch (error) {
      return rejectWithValue(
        getApiErrorMessage(error, "تعذر تحميل السلايدر"),
      );
    }
  },
);

/* =========================
   Create Slider
========================= */
export const createSlider = createAsyncThunk(
  "slider/createSlider",
  async (data, { rejectWithValue }) => {
    try {
      const res = await sliderServices.createSlider(data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        getApiErrorMessage(error, "تعذر إضافة السلايدر"),
      );
    }
  },
);

/* =========================
   Update Slider
========================= */
export const updateSlider = createAsyncThunk(
  "slider/updateSlider",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await sliderServices.updateSlider(id, formData);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        getApiErrorMessage(error, "تعذر تعديل السلايدر"),
      );
    }
  },
);

/* =========================
   Delete Slider
========================= */
export const deleteSlider = createAsyncThunk(
  "slider/deleteSlider",
  async (id, { rejectWithValue }) => {
    try {
      const res = await sliderServices.deleteSlider(id);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(
        getApiErrorMessage(error, "تعذر حذف السلايدر"),
      );
    }
  },
);
