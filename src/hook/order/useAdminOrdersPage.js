import { useMemo, useState } from "react";
import useGetOrder from "./useGetOrder";

const useAdminOrdersPage = () => {
  const { orders, isLoading, error, reload } = useGetOrder();
  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = search.toLowerCase();
    return (orders || []).filter((order) => {
      const fullName = `${order?.user?.firstName || ""} ${order?.user?.lastName || ""}`;
      return (
        fullName.toLowerCase().includes(query) ||
        order?._id?.toLowerCase().includes(query)
      );
    });
  }, [orders, search]);

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setEditOpen(true);
  };

  const handleDetails = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleSearchChange = (event) => setSearch(event.target.value);
  const closeEdit = () => setEditOpen(false);
  const closeDetails = () => setDetailsOpen(false);

  return {
    orders,
    filteredOrders,
    search,
    isLoading,
    error,
    reload,
    editOpen,
    detailsOpen,
    selectedOrder,
    handleEdit,
    handleDetails,
    handleSearchChange,
    closeEdit,
    closeDetails,
  };
};

export default useAdminOrdersPage;
