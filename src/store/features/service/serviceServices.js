import api from "../../baseUrl";

export const getServices = (params = {}, legacyLimit) =>
  api.get("/service", {
    params:
      typeof params === "number"
        ? { page: params, limit: legacyLimit }
        : params,
  });
export const getService = (id) => api.get(`/service/${id}`);
export const getSimilarServices = (id) => api.get(`/service/${id}/similar`);
export const createService = (data) => api.post("/service", data);
export const updateService = (id, data) => api.put(`/service/${id}`, data);
export const deleteService = (id) => api.delete(`/service/${id}`);
