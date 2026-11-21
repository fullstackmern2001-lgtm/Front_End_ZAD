const translations = {
  "Only Images Allowed": "يسمح بإضافة الصور فقط",
  "File too large": "حجم الصورة أكبر من الحد المسموح",
  "Unexpected field": "بيانات الصورة المرسلة غير صحيحة",
  "Your session has expired. Please log in again.":
    "انتهت صلاحية جلستك، يرجى تسجيل الدخول مرة أخرى",
  "Invalid token. Please log in again.":
    "بيانات تسجيل الدخول غير صالحة، يرجى تسجيل الدخول مرة أخرى",
  "You are not allowed to access this route":
    "ليس لديك صلاحية تنفيذ هذا الإجراء",
  "An unexpected error occurred.":
    "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى",
  "Network Error": "تعذر الاتصال بالخادم، تحقق من اتصال الإنترنت وحاول مرة أخرى",
};

const containsArabic = (message) => /[\u0600-\u06ff]/.test(message);

export const getApiErrorMessage = (error, fallback) => {
  const responseData = error?.response?.data || error;
  const validationMessages = Array.isArray(responseData?.errors)
    ? responseData.errors
        .map((item) => item?.msg || item?.message || item)
        .filter((message) => typeof message === "string")
    : [];
  const message =
    validationMessages.join("، ") ||
    (typeof responseData?.message === "string" && responseData.message) ||
    (typeof error === "string" && error) ||
    (typeof error?.message === "string" && error.message);

  if (message) {
    if (containsArabic(message)) return message;
    if (translations[message]) return translations[message];
    if (message.includes("Network Error")) {
      return translations["Network Error"];
    }
  }

  if (
    error?.message === "Network Error" ||
    error?.code === "ERR_NETWORK" ||
    error?.code === "ECONNABORTED"
  ) {
    return translations["Network Error"];
  }

  return fallback;
};
