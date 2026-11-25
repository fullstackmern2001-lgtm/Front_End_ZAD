import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  checkoutStatusThunk,
  getUserOrdersThunk,
} from "../../store/features/order/OrderThunks";
import useGetOrder from "./useGetOrder";

const useUserOrdersPage = () => {
  const { orders, isLoading, error, reload } = useGetOrder();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const gateway = searchParams.get("gateway");
  const gatewayStatus = searchParams.get("status");
  const [checkoutStatus, setCheckoutStatus] = useState(null);
  const [checkoutCheckVersion, setCheckoutCheckVersion] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!sessionId) {
      if (gateway === "paypal" && gatewayStatus === "success") {
        dispatch(getUserOrdersThunk());
      }
      return undefined;
    }

    let isActive = true;
    let timer;
    let checks = 0;

    const checkStatus = async () => {
      if (checks === 0) setCheckoutStatus("checking");
      const result = await dispatch(checkoutStatusThunk(sessionId));
      if (!isActive) return;

      if (checkoutStatusThunk.fulfilled.match(result)) {
        const status = result.payload.paymentStatus;
        setCheckoutStatus(status);
        if (status === "paid") {
          dispatch(getUserOrdersThunk());
        } else if (status === "pending" && checks < 9) {
          checks += 1;
          timer = setTimeout(checkStatus, 3000);
        }
      } else {
        setCheckoutStatus("error");
      }
    };

    checkStatus();
    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, [checkoutCheckVersion, dispatch, gateway, gatewayStatus, sessionId]);

  const filteredOrders = useMemo(
    () =>
      (orders || []).filter((order) =>
        order?._id?.toLowerCase().includes(search.toLowerCase()),
      ),
    [orders, search],
  );
  const handleSearchChange = (event) => setSearch(event.target.value);
  const retryCheckoutCheck = () => setCheckoutCheckVersion((version) => version + 1);

  const effectiveCheckoutStatus = sessionId
    ? checkoutStatus || "checking"
    : gateway === "paypal" && gatewayStatus === "success"
      ? "paid"
      : null;

  return {
    filteredOrders,
    search,
    isLoading,
    error,
    reload,
    handleSearchChange,
    checkoutStatus: effectiveCheckoutStatus,
    retryCheckoutCheck,
  };
};

export default useUserOrdersPage;
