import React from "react";
import { LoaderCircle } from "lucide-react";
import useUserOrdersPage from "../../hook/order/useUserOrdersPage";
import {
  OrderSkeleton,
  SkeletonList,
} from "../../components/utils/ContentSkeletons";
import OrderSection from "../../components/dashpord/order/OrderSection";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const OrdersPage = () => {
  const {
    filteredOrders,
    search,
    isLoading,
    error,
    reload,
    handleSearchChange,
    checkoutStatus,
    retryCheckoutCheck,
  } = useUserOrdersPage();

  const checkoutMessages = {
    checking: "جارٍ التحقق من نتيجة الدفع...",
    paid: "تم تأكيد الدفع بنجاح، وتم تحديث قائمة الطلبات.",
    pending:
      "الدفع قيد التأكيد لدى بوابة الدفع. لا تعتبر العملية مكتملة حتى يظهر الطلب مدفوعًا.",
    failed: "لم يتم تأكيد الدفع. يمكنك المحاولة مجددًا من سلة الخدمات.",
    expired: "انتهت صلاحية جلسة الدفع. ابدأ محاولة دفع جديدة من السلة.",
    error: "تعذر التحقق من حالة الدفع. أعد المحاولة بعد قليل.",
  };
  const showCheckoutRetry = ["pending", "error"].includes(checkoutStatus);

  if (isLoading) {
    return (
      <>
        {checkoutStatus && (
          <div
            className="mb-4 rounded-xl bg-blue-50 p-4 text-center text-blue-800"
            role="status"
          >
            <p>{checkoutMessages[checkoutStatus]}</p>
            {showCheckoutRetry && (
              <button
                type="button"
                onClick={retryCheckoutCheck}
                className="mt-2 rounded-lg border border-blue-300 px-4 py-2"
              >
                تحقق مجددًا
              </button>
            )}
          </div>
        )}
        <p className="mb-4 flex items-center justify-center gap-2 text-green-800" role="status">
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          جاري تحميل الطلبات...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonList count={3} Card={OrderSkeleton} />
        </div>
      </>
    );
  }

  return (
    <div className="!p-4 md:!p-6 !space-y-4">
      {checkoutStatus && (
        <div
          className={`rounded-xl p-4 text-center ${
            checkoutStatus === "paid"
              ? "bg-green-50 text-green-800"
              : ["failed", "expired", "error"].includes(checkoutStatus)
                ? "bg-red-50 text-red-800"
                : "bg-blue-50 text-blue-800"
          }`}
          role={["failed", "expired", "error"].includes(checkoutStatus) ? "alert" : "status"}
        >
          <p>{checkoutMessages[checkoutStatus]}</p>
          {showCheckoutRetry && (
            <button
              type="button"
              onClick={retryCheckoutCheck}
              className="mt-2 rounded-lg border border-current px-4 py-2"
            >
              تحقق مجددًا
            </button>
          )}
        </div>
      )}
      <input
        type="text"
        placeholder="ابحث برقم الطلب"
        className="w-full border rounded-xl !px-4 !py-2 focus:outline-none focus:ring-2 focus:ring-black"
        onChange={handleSearchChange}
      />

      {error ? (
        <div className="rounded-xl bg-red-50 p-5 text-center text-red-800" role="alert">
          <p>{getApiErrorMessage(error, "تعذر تحميل الطلبات")}</p>
          <button type="button" onClick={reload} className="mt-3 rounded-lg border border-red-300 px-4 py-2">
            إعادة المحاولة
          </button>
        </div>
      ) : filteredOrders.length === 0 && (
        <p className="text-center text-gray-600">
          {search ? "لا توجد طلبات تطابق البحث" : "لا توجد طلبات مضافة حتى الآن"}
        </p>
      )}

      <div className="!space-y-6">
        {filteredOrders.map((order) => (
          <OrderSection key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(OrdersPage);
