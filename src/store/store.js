import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth/authSlice";
import updateUser from "./features/user/userSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice";
import reviewSlice from "./features/review/reviewSlice";
import cartReducer from "./features/cart/cartSlice";
import sliderReducer from "./features/slider/sliderSlice";
import orderReducer from "./features/order/OrderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: updateUser,
    wishlist: wishlistSlice,
    review: reviewSlice,
    cart: cartReducer,
    slider: sliderReducer,
    order: orderReducer,
  },
});
