import api from "../../baseUrl";

// ================= CREATE =================
export const createSlider = (data) => api.post("/slider", data);

// ================= GET ALL =================
export const getCSliders = () => api.get("/slider");

// ================= DELETE =================
export const deleteSlider = (id) => api.delete(`/slider/${id}`);

// ================= UPDATE =================
export const updateSlider = (id, data) => api.put(`/slider/${id}`, data);
