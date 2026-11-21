import api from "../../baseUrl";

// ================= ADD REVIEW =================
export const addReview = (data) => api.post("/review", data);

// ================= GET REVIEWS FOR SERVICE =================
export const getReviewsForService = (serviceId) =>
  api.get(`/review?service=${serviceId}`);

// ================= GET SERVICE REVIEWS FOR HOME =================
export const getServiceReviews = (params) =>
  api.get("/review/home", { params });

// ================= GET ALL REVIEWS FOR ADMIN =================
export const getAllReviews = (params) => api.get("/review/admin", { params });

// ================= UPDATE REVIEW =================
export const updateReview = (id, data) => api.put(`/review/${id}`, data);

// ================= DELETE REVIEW =================
export const deleteReview = (id) => api.delete(`/review/${id}`);
