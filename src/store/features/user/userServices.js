import api from "../../baseUrl";

// ================= CREATE =================
export const createUser = (data) => api.post("/user", data);

// ================= GET ALL =================

export const getAllUser = (query = "") => api.get(`/use${query}`);
// ================= GET ALL =================

export const getOneUser = (id) => api.get(`/use/${id}`);

// ================= DELETE =================

export const deleteUser = (id) => api.delete(`/use/${id}`);

// ================= UPDATE DATA =================

export const updateUser = (id, data) => api.put(`/user/${id}`, data);

// ================= UPDATE PASSWORD =================
export const updateUserPassword = (id, data) =>
  api.put(`/user/changePassword/${id}`, data);

// ================= GET USER =================
export const getMe = () => api.get("/user/getMe");
