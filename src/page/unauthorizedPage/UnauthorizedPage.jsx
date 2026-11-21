import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";
import React from "react";
const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 !px-4 text-center">
      <FiAlertTriangle className="text-red-600 text-8xl !mb-6" />
      <h1 className="text-4xl font-bold !mb-4">غير مسموح لك بالدخول</h1>
      <p className="text-green-700 !mb-6">
        عذراً، أنت لا تملك صلاحية الدخول لهذه الصفحة. هذه المسارات محمية للمدير
        أو المستخدم المصرح له فقط.
      </p>
      <Link
        to="/"
        className="!px-6 !py-3 bg-green-900 text-white font-semibold !rounded-xl hover:bg-green-700 transition"
      >
        العودة للصفحة الرئيسية
      </Link>
      <img
        src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
        alt="Unauthorized"
        className="w-64 !mt-8 !mx-auto max-w-full"
      />
    </div>
  );
};

export default React.memo(UnauthorizedPage);
