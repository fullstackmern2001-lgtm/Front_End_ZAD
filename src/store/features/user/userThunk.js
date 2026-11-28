import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userServices from "./userServices";

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const res = await userServices.getMe();
    return thunkAPI.getState().auth.isAuth ? res.data.data : null;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error?.response?.data?.message || "Get user failed",
    );
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await userServices.updateUser(id, data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Update user failed",
      );
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await userServices.updateUserPassword(id, data);
      console.log(res);

      return res.data.message || "Password updated successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.errors[0]?.msg || "Update user Password failed",
      );
    }
  },
);
