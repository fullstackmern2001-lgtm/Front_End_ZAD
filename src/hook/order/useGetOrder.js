import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrdersThunk } from "../../store/features/order/OrderThunks";

const useGetOrder = () => {
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  return { orders, isLoading, error, reload: () => dispatch(getUserOrdersThunk()) };
};

export default useGetOrder;
