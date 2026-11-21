import { useEffect, useMemo, useState } from "react";
import useServices from "./useServices";
import * as categoryApi from "../../store/features/category/categoryServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const initialFilters = {
  keyword: "",
  minPrice: "",
  maxPrice: "",
  category: "",
  sort: "newest",
};

const useServicesPage = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let active = true;
    categoryApi
      .getCategories()
      .then((response) => {
        if (active) setCategories(response.data.data || []);
      })
      .catch((error) => {
        if (active) {
          setCategoryError(
            getApiErrorMessage(error, "تعذر تحميل التصنيفات"),
          );
        }
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchKeyword(filters.keyword.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [filters.keyword]);

  const serviceFilters = useMemo(
    () => ({
      keyword: searchKeyword || undefined,
      minPrice: filters.minPrice || undefined,
      maxPrice: filters.maxPrice || undefined,
      category: filters.category || undefined,
      sort: filters.sort || undefined,
    }),
    [
      filters.category,
      filters.maxPrice,
      filters.minPrice,
      filters.sort,
      searchKeyword,
    ],
  );
  const { services, pagination, isLoading, error, reload } = useServices(
    serviceFilters,
    page,
    8,
  );

  const updateFilter = (name, value) => {
    setFilters((previous) => ({ ...previous, [name]: value }));
    if (name !== "keyword") setPage(1);
  };

  const handleKeywordChange = (event) =>
    updateFilter("keyword", event.target.value);
  const handleMinPriceChange = (event) =>
    updateFilter("minPrice", event.target.value);
  const handleMaxPriceChange = (event) =>
    updateFilter("maxPrice", event.target.value);
  const handleCategoryChange = (event) =>
    updateFilter("category", event.target.value);
  const handleSortChange = (event) => updateFilter("sort", event.target.value);

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchKeyword("");
    setPage(1);
  };

  return {
    filters,
    categories,
    categoryError,
    page,
    setPage,
    services,
    pagination,
    isLoading,
    error,
    reload,
    handleKeywordChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleCategoryChange,
    handleSortChange,
    resetFilters,
  };
};

export default useServicesPage;
