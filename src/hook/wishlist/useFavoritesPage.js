import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PAGE_SIZE = 8;

const useFavoritesPage = () => {
  const { wishlist, isLoading, error } = useSelector((state) => state.wishlist);
  const [page, setPage] = useState(1);
  const services = Array.isArray(wishlist) ? wishlist : [];
  const totalPages = Math.ceil(services.length / PAGE_SIZE);
  const visibleServices = services.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, Math.max(totalPages, 1)));
  }, [totalPages]);

  return {
    services,
    visibleServices,
    page,
    totalPages,
    setPage,
    isLoading,
    error,
  };
};

export default useFavoritesPage;
