import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as categoryApi from "../../store/features/category/categoryServices";
import notify from "../useNotifaction";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const emptyForm = { name: "", image: null, imagePreview: "" };

const useCategoriesAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFormPage = location.pathname.endsWith("/new");
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingCategory, setEditingCategory] = useState(
    location.state?.category || null,
  );
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setLoadError("");
      const response = await categoryApi.getCategories();
      setCategories(response.data.data || []);
      return true;
    } catch (error) {
      const message = getApiErrorMessage(error, "تعذر تحميل التصنيفات");
      setLoadError(message);
      notify(message, "error");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const category = location.state?.category || null;
    setEditingCategory(category);
    setForm(
      category
        ? { name: category.name, image: null, imagePreview: category.image }
        : emptyForm,
    );
    setFormError("");
  }, [location.pathname, location.state]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files?.[0]) {
      if (form.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(form.imagePreview);
      }
      setForm((previous) => ({
        ...previous,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
      return;
    }
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const name = form.name.trim();

    if (name.length < 2 || name.length > 80) {
      const message = "اسم التصنيف يجب أن يكون بين حرفين و80 حرفًا";
      setFormError(message);
      notify(message, "warn");
      return;
    }
    if (!editingCategory && !form.image) {
      const message = "الرجاء اختيار صورة للتصنيف";
      setFormError(message);
      notify(message, "warn");
      return;
    }
    if (
      form.image &&
      !["image/jpeg", "image/png", "image/webp"].includes(form.image.type)
    ) {
      const message = "يسمح برفع صور JPEG وPNG وWEBP فقط";
      setFormError(message);
      notify(message, "warn");
      return;
    }
    if (form.image && form.image.size > 5 * 1024 * 1024) {
      const message = "يجب ألا يتجاوز حجم الصورة 5MB";
      setFormError(message);
      notify(message, "warn");
      return;
    }

    try {
      setIsSaving(true);
      setFormError("");
      const data = new FormData();
      data.append("name", name);
      if (form.image) data.append("image", form.image);

      if (editingCategory) {
        await categoryApi.updateCategory(editingCategory._id, data);
        notify("تم تعديل التصنيف بنجاح", "success");
      } else {
        await categoryApi.createCategory(data);
        notify("تمت إضافة التصنيف بنجاح", "success");
      }
      await loadCategories();
      navigate("/admin/categories");
    } catch (error) {
      const message = getApiErrorMessage(error, "تعذر حفظ التصنيف");
      setFormError(message);
      notify(message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;
    try {
      setIsDeleting(true);
      setFormError("");
      await categoryApi.deleteCategory(deleteCategory._id);
      notify("تم حذف التصنيف بنجاح", "success");
      setDeleteCategory(null);
      await loadCategories();
    } catch (error) {
      const message = getApiErrorMessage(error, "تعذر حذف التصنيف");
      setFormError(message);
      notify(message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (category) => {
    navigate("/admin/categories/new", { state: { category } });
  };

  const closeDelete = () => {
    if (!isDeleting) setDeleteCategory(null);
  };

  return {
    isFormPage,
    categories,
    form,
    editingCategory,
    deleteCategory,
    isLoading,
    isSaving,
    isDeleting,
    loadError,
    formError,
    loadCategories,
    handleChange,
    handleSave,
    handleDelete,
    handleEdit,
    setDeleteCategory,
    closeDelete,
  };
};

export default useCategoriesAdmin;
