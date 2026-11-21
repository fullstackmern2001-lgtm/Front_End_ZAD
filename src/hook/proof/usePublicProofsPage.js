import { useState } from "react";
import useProofs from "./useProofs";

const usePublicProofsPage = () => {
  const [page, setPage] = useState(1);
  const { proofs, pagination, isLoading, error, reload } = useProofs(page, 9);
  const pageCount = pagination?.numberOfPages || 0;
  const goToPreviousPage = () =>
    setPage((currentPage) => Math.max(1, currentPage - 1));
  const goToNextPage = () =>
    setPage((currentPage) => Math.min(pageCount, currentPage + 1));

  return {
    page,
    setPage,
    proofs,
    pagination,
    pageCount,
    goToPreviousPage,
    goToNextPage,
    isLoading,
    error,
    reload,
  };
};

export default usePublicProofsPage;
