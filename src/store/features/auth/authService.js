import api from "../../baseUrl";

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);
export const requestPasswordReset = (data) =>
  api.post("/auth/forgot-password", data);
export const verifyPasswordResetCode = (data) =>
  api.post("/auth/verify-reset-code", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
export const getProfile = () => api.get("/users/me");
// ================= UPDATE =================
export const updateUser = (id, data) => api.put(`/use/${id}`, data);
