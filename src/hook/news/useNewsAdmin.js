import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
import * as newsApi from "../../store/features/news/newsServices";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const emptyForm = {
  title: "",
  description: "",
  publishedAt: "",
  image: null,
  imagePreview: null,
};

const useNewsAdmin = () => {
  const isCreatePage = useLocation().pathname.endsWith("/new");
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editingNews, setEditingNews] = useState(false);
  const [confirmType, setConfirmType] = useState(null);

  const loadNews = async () => {
    try {
      setIsFetching(true);
      setLoadError("");
      const response = await newsApi.getNews();
      setNews(response.data?.data || []);
      return true;
    } catch (error) {
      const message = getApiErrorMessage(error, "تعذر تحميل الأخبار");
      setLoadError(message);
      notify(message, "error");
      return false;
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const file = files?.[0] || null;

    setForm((previousForm) => {
      if (file && previousForm.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(previousForm.imagePreview);
      }
      return {
      ...previousForm,
      [name]: file || value,
      ...(file ? { imagePreview: URL.createObjectURL(file) } : {}),
      };
    });
  };

  const resetForm = () => {
    if (form.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm(emptyForm);
    setEditingId(null);
  };

  const editNews = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      description: item.description,
      publishedAt: new Date(item.publishedAt).toISOString().slice(0, 10),
      image: null,
      imagePreview: item.image,
    });
  };

  const buildFormData = () => {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("publishedAt", form.publishedAt);

    if (form.image instanceof File) {
      data.append("image", form.image);
    } else if (editingId && form.imagePreview) {
      data.append("image", form.imagePreview);
    }

    return data;
  };

  const saveNews = async () => {
    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.publishedAt ||
      (!editingId && !form.image)
    ) {
      notify("الرجاء تعبئة جميع الحقول واختيار صورة الخبر", "warn");
      return false;
    }

    try {
      setLoading(true);
      const data = buildFormData();

      if (editingId) {
        await newsApi.updateNews(editingId, data);
        notify("تم تعديل الخبر بنجاح", "success");
      } else {
        await newsApi.createNews(data);
        notify("تمت إضافة الخبر بنجاح", "success");
      }

      resetForm();
      await loadNews();
      return true;
    } catch (error) {
      notify(
        getApiErrorMessage(
          error,
          "تعذر حفظ الخبر، يرجى المحاولة مرة أخرى",
        ),
        "error",
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeNews = async (id) => {
    try {
      setLoading(true);
      await newsApi.deleteNews(id);
      notify("تم حذف الخبر بنجاح", "success");
      await loadNews();
    } catch (error) {
      notify(
        getApiErrorMessage(
          error,
          "تعذر حذف الخبر، يرجى المحاولة مرة أخرى",
        ),
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const saved = await saveNews();
    if (saved) navigate("/admin/news");
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setConfirmType("edit");
  };

  const confirmAction = async () => {
    if (confirmType === "delete") {
      await removeNews(deleteId);
      setDeleteId(null);
    } else {
      const saved = await saveNews();
      if (saved) setEditingNews(false);
    }

    setConfirmType(null);
  };

  const startEditing = (item) => {
    editNews(item);
    setEditingNews(true);
  };

  const closeEdit = () => {
    setEditingNews(false);
    resetForm();
  };

  const requestDelete = (id) => {
    setDeleteId(id);
    setConfirmType("delete");
  };

  const closeConfirmation = () => setConfirmType(null);

  return {
    isCreatePage,
    news,
    form,
    editingId,
    loading,
    isFetching,
    loadError,
    handleChange,
    editNews,
    resetForm,
    saveNews,
    removeNews,
    loadNews,
    deleteId,
    editingNews,
    confirmType,
    handleCreate,
    handleEditSubmit,
    confirmAction,
    startEditing,
    closeEdit,
    requestDelete,
    closeConfirmation,
  };
};

export default useNewsAdmin;
