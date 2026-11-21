import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const res = await authService.login(data);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || "Login failed",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await authService.register(data);
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.errors || "Register failed",
      );
    }
  },
);
