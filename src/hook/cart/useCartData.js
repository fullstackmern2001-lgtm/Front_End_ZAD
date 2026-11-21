import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../store/features/cart/cartThunk";
import { resetCart } from "../../store/features/cart/cartSlice";

const useCartData = () => {
  const dispatch = useDispatch();
  const { cart, isLoading } = useSelector((state) => state.cart);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUserCart());
    } else {
      dispatch(resetCart());
    }
  }, [dispatch, isAuth]);

  return { cart, isLoading };
};

export default useCartData;
