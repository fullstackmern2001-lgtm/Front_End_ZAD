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
  } = useUserOrdersPage();

  if (isLoading) {
    return (
      <>
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
