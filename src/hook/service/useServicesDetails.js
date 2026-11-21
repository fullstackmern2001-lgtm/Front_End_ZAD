import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as serviceApi from "../../store/features/service/serviceServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import { getReviews } from "../../store/features/review/reviewThunk";
import notify from "../useNotifaction";

const useServicesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [service, setService] = useState(null);
  const [similarServices, setSimilarServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshService = useCallback(async () => {
    const [reviewResult, serviceResult] = await Promise.allSettled([
      dispatch(getReviews(id)).unwrap(),
      serviceApi.getService(id),
    ]);
    if (reviewResult.status === "rejected") throw reviewResult.reason;
    if (serviceResult.status === "fulfilled") {
      setService(serviceResult.value.data.data);
    } else {
      notify("تم تحديث التقييم، لكن تعذر تحديث ملخصه", "warn");
    }
  }, [dispatch, id]);

  useEffect(() => {
    let isActive = true;

    const loadServiceDetails = async () => {
      setIsLoading(true);
      setError(null);
      setService(null);
      setSimilarServices([]);

      try {
        const [serviceResponse, similarResponse] = await Promise.all([
          serviceApi.getService(id),
          serviceApi.getSimilarServices(id),
        ]);
        if (!isActive) return;

        setService(serviceResponse.data.data);
        setSimilarServices(similarResponse.data.data || []);
      } catch (requestError) {
        if (isActive) {
          setError(getApiErrorMessage(requestError, "تعذر تحميل تفاصيل الخدمة"));
        }
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    if (id) {
      loadServiceDetails();
    } else {
      setIsLoading(false);
      setError("معرّف الخدمة غير موجود");
    }

    return () => {
      isActive = false;
    };
  }, [id]);

  return { service, similarServices, isLoading, error, refreshService };
};

export default useServicesDetails;
