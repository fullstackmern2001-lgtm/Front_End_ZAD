import notify from "../../hook/useNotifaction";

const translations = {
  service: {
    "Service name is required": "اسم الخدمة مطلوب",
    "You are not allowed to access this route": "انت غير مسموح لك فقط للادمن",
    "Create Service failed": "تعذر إضافة الخدمة، يرجى المحاولة مرة أخرى",
    "Update Service failed": "تعذر تعديل الخدمة، يرجى المحاولة مرة أخرى",
    "Delete Service failed": "تعذر حذف الخدمة، يرجى المحاولة مرة أخرى",
    "Only Images Allowed": "يسمح بإضافة الصور فقط",
    "An unexpected error occurred.":
      "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى",
  },
};

export const handleError = (error, type = "general") => {
  if (!error) return;

  const responseData = error?.response?.data;
  const errors = Array.isArray(error)
    ? error
    : Array.isArray(error?.errors)
      ? error.errors
      : Array.isArray(responseData?.errors)
        ? responseData.errors
        : [];
  const messages = errors
    .map((item) => item?.msg || item?.message || item)
    .filter((message) => typeof message === "string");
  const message =
    messages.join("، ") ||
    (typeof error === "string" && error) ||
    error?.msg ||
    error?.message ||
    responseData?.message;

  if (!message) {
    notify("حدث خطأ ما، يرجى المحاولة مرة أخرى", "error");
    return;
  }

  const translatedMessage =
    translations[type]?.[message] ||
    (/[ء-ي]/.test(message)
      ? message
      : "تعذر إكمال العملية، يرجى المحاولة مرة أخرى");
  notify(translatedMessage, "error");
};
