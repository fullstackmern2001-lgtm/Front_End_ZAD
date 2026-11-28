import { useCallback, useEffect, useState } from "react";
import * as proofApi from "../../store/features/proof/proofServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useProofs = (page = 1, limit = 6) => {
  const [proofs, setProofs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProofs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await proofApi.getProofs(page, limit);
      setProofs(response.data?.data || []);
      setPagination(response.data?.paginationResult || null);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل التوثيقات"));
    } finally {
      setIsLoading(false);
    }
  }, [limit, page]);

  useEffect(() => {
    loadProofs();
  }, [loadProofs]);

  return { proofs, pagination, isLoading, error, reload: loadProofs };
};

export default useProofs;
