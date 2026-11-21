import api from "../../baseUrl";

export const getProofs = (page = 1, limit = 6) =>
  api.get("/proofs", { params: { page, limit } });
export const createProof = (data) => api.post("/proofs", data);
export const updateProof = (id, data) => api.put(`/proofs/${id}`, data);
export const deleteProof = (id) => api.delete(`/proofs/${id}`);
