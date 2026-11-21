import { createSlice } from "@reduxjs/toolkit";
import { getMe, updateUser, updateUserPassword } from "./userThunk";
import { logout } from "../auth/authSlice";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  passwordSuccess: false, // حالة نجاح تغيير كلمة السر
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetPasswordSuccess: (state) => {
      state.passwordSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
        state.passwordSuccess = false;
      })
      // =================GET LOGGED USER=====================================================
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ====================UPDATE USER==========================================
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ===========================UPDATE USER PASSWORD=============================================
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordSuccess = false;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordSuccess = true;
        state.error = null;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.passwordSuccess = false;
      });
  },
});

export const { resetPasswordSuccess } = userSlice.actions;
export default userSlice.reducer;
