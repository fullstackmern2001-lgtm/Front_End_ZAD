import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "../store/features/wishlist/wishlistThunk";
import { resetWishlist } from "../store/features/wishlist/wishlistSlice";

const useAppInitialization = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getWishlist());
    } else {
      dispatch(resetWishlist());
    }
  }, [dispatch, isAuth]);
};

export default useAppInitialization;
