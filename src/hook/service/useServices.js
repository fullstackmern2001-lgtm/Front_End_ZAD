import { useCallback, useEffect, useState } from "react";
import * as serviceApi from "../../store/features/service/serviceServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const EMPTY_FILTERS = Object.freeze({});

const useServices = (filters = EMPTY_FILTERS, page = 1, limit = 8) => {
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadServices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await serviceApi.getServices({
        ...filters,
        page,
        limit,
      });
      setServices(response.data.data || []);
      setPagination({
        ...(response.data.paginationResult || {}),
        totalResults: response.data.results ?? 0,
      });
      setError(null);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل الخدمات"));
    } finally {
      setIsLoading(false);
    }
  }, [filters, limit, page]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return { services, pagination, isLoading, error, reload: loadServices };
};

export default useServices;
