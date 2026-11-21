import { useCallback, useEffect, useState } from "react";
import notify from "../useNotifaction";
import * as serviceApi from "../../store/features/service/serviceServices";
import * as categoryApi from "../../store/features/category/categoryServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  minQuantity: 1,
  category: "",
  image: null,
};

const useServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [pagination, setPagination] = useState({});
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const loadServices = useCallback(async (page, limit) => {
    try {
      setIsFetching(true);
      setLoadError("");
      let response = await serviceApi.getServices(page, limit);
      let loadedPage = page;
      const responseServices = response.data.data || [];
      const responsePages = response.data.paginationResult?.numberOfPages || 0;

      if (page > 1 && responseServices.length === 0 && page > responsePages) {
        loadedPage = Math.max(responsePages, 1);
        response = await serviceApi.getServices(loadedPage, limit);
      }

      setServices(response.data.data || []);
      setPagination(response.data.paginationResult || {});
      setCurrentPage(loadedPage);
      return true;
    } catch (error) {
      const message = getApiErrorMessage(error, "تعذر تحميل الخدمات");
      setLoadError(message);
      notify(message, "error");
      return false;
    } finally {
      setIsFetching(false);
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      setCategoryError("");
      const response = await categoryApi.getCategories();
      setCategories(response.data.data || []);
    } catch (error) {
      const message = getApiErrorMessage(error, "تعذر تحميل التصنيفات");
      setCategoryError(message);
      notify(message, "error");
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadServices(currentPage, pageSize);
  }, [currentPage, loadServices, pageSize]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: files ? files[0] : value,
      ...(files?.[0]
        ? { imagePreview: URL.createObjectURL(files[0]) }
        : {}),
    }));
  };

  const resetForm = () => {
    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const missingFields = [];

    if (!form.name.trim()) missingFields.push("اسم الخدمة");
    if (!form.description.trim()) missingFields.push("وصف الخدمة");
    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      missingFields.push("سعر الخدمة");
    }
    if (
      form.minQuantity === "" ||
      !Number.isFinite(Number(form.minQuantity)) ||
      !Number.isInteger(Number(form.minQuantity)) ||
      Number(form.minQuantity) < 1
    ) {
      missingFields.push("أقل كمية للتبرع");
    }
    if (!form.category) missingFields.push("تصنيف الخدمة");
    if (!editingId && !form.image) missingFields.push("صورة الخدمة");

    if (missingFields.length) {
      notify(`يرجى إدخال البيانات المطلوبة: ${missingFields.join("، ")}`, "warn");
      return false;
    }

    try {
      setLoadingAction("saving");
      const data = new FormData();
      data.append("name", form.name.trim());
      data.append("description", form.description.trim());
      data.append("price", form.price);
      data.append("minQuantity", form.minQuantity);
      data.append("category", form.category);
      if (form.image) data.append("image", form.image);

      if (editingId) {
        await serviceApi.updateService(editingId, data);
      } else {
        await serviceApi.createService(data);
      }

      notify(editingId ? "تم تعديل الخدمة" : "تمت إضافة الخدمة", "success");
      resetForm();
      await loadServices(currentPage, pageSize);
      return true;
    } catch (error) {
      notify(
        getApiErrorMessage(error, "تعذر حفظ الخدمة، يرجى المحاولة مرة أخرى"),
        "error",
      );
      return false;
    } finally {
      setLoadingAction(null);
    }
  };

  const editService = (service) => {
    setForm({
      name: service.name,
      description: service.description || "",
      price: service.price ?? "",
      minQuantity: service.minQuantity ?? 1,
      category: service.category?._id || service.category || "",
      image: null,
      imagePreview: service.image || null,
    });
    setEditingId(service._id);
  };

  const deleteService = async (id) => {
    try {
      setLoadingAction("deleting");
      await serviceApi.deleteService(id);
      notify("تم حذف الخدمة", "success");
      await loadServices(currentPage, pageSize);
      return true;
    } catch (error) {
      notify(
        getApiErrorMessage(error, "تعذر حذف الخدمة، يرجى المحاولة مرة أخرى"),
        "error",
      );
      return false;
    } finally {
      setLoadingAction(null);
    }
  };

  const handleServiceEdit = (service) => {
    editService(service);
    setSelectedService(service);
  };

  const handleServiceUpdate = async (event) => {
    const updated = await handleSubmit(event);
    if (updated) setSelectedService(null);
  };

  const handleServiceDelete = async () => {
    const deleted = await deleteService(deleteId);
    if (deleted) setDeleteId(null);
  };

  const closeSelectedService = () => {
    if (loadingAction === null) setSelectedService(null);
  };

  const closeDeleteModal = () => {
    if (loadingAction === null) setDeleteId(null);
  };

  return {
    services,
    categories,
    isLoadingCategories,
    categoryError,
    loadCategories,
    form,
    editingId,
    loading: loadingAction !== null,
    loadingAction,
    isFetching,
    loadError,
    handleChange,
    handleSubmit,
    editService,
    deleteService,
    resetForm,
    pagination,
    pageSize,
    currentPage,
    setCurrentPage,
    loadServices,
    selectedService,
    deleteId,
    setDeleteId,
    handleServiceEdit,
    handleServiceUpdate,
    handleServiceDelete,
    closeSelectedService,
    closeDeleteModal,
  };
};

export default useServicesAdmin;
