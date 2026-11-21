import api from "../../baseUrl";

// Toggle wishlist
export const toggleWishlist = (serviceId) =>
  api.post("/wishlist", { serviceId });

// Get wishlist
export const getWishlist = () => api.get("/wishlist");
