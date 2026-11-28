import api from "../../baseUrl";

export const getNews = () => api.get("/news");
export const createNews = (data) => api.post("/news", data);
export const updateNews = (id, data) => api.put(`/news/${id}`, data);
export const deleteNews = (id) => api.delete(`/news/${id}`);
