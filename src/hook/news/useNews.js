import { useEffect, useState } from "react";
import * as newsApi from "../../store/features/news/newsServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useNews = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      const response = await newsApi.getNews();
      setNews(response.data?.data || []);
      setError(null);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل الأخبار"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  return { news, isLoading, error, reload: loadNews };
};

export default useNews;
