import axios from "axios";
const apiBase =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://my-mern-backend-wn2l.onrender.com/api/v1"
    : "http://localhost:8000/api/v1");
const api = axios.create({
  baseURL: apiBase,
});

// إضافة التوكن تلقائي
api.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
