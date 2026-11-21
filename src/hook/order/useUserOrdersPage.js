import { useMemo, useState } from "react";
import useGetOrder from "./useGetOrder";

const useUserOrdersPage = () => {
  const { orders, isLoading, error, reload } = useGetOrder();
  const [search, setSearch] = useState("");
  const filteredOrders = useMemo(
    () =>
      (orders || []).filter((order) =>
        order?._id?.toLowerCase().includes(search.toLowerCase()),
      ),
    [orders, search],
  );
  const handleSearchChange = (event) => setSearch(event.target.value);

  return { filteredOrders, search, isLoading, error, reload, handleSearchChange };
};

export default useUserOrdersPage;
