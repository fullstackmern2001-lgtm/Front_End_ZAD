import api from "../../baseUrl";

// Add to cart
export const addToCart = (data) => api.post("/cart", data);

// Get cart
export const getCart = () => api.get("/cart");

// Remove item
export const removeCartItem = (id) => api.delete(`/cart/${id}`);

// Update quantity
export const updateCartItem = (id, data) => api.put(`/cart/${id}`, data);

// Clear cart
export const clearCart = () => api.delete("/cart");
