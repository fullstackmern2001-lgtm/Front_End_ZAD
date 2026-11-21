import React from "react";
import { LoaderCircle } from "lucide-react";
import OrderCard from "../../components/admin/order/OrderCard";
import EditOrderModal from "../../components/admin/order/EditOrderModal";
import OrderDetailsModal from "../../components/admin/order/OrderDetailsModal";
import useAdminOrdersPage from "../../hook/order/useAdminOrdersPage";
import {
  OrderSkeleton,
  SkeletonList,
} from "../../components/utils/ContentSkeletons";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const OrdersPage = () => {
  const {
    filteredOrders,
    search,
    isLoading,
    error,
    reload,
    editOpen,
    detailsOpen,
    selectedOrder,
    handleEdit,
    handleDetails,
    handleSearchChange,
    closeEdit,
    closeDetails,
  } = useAdminOrdersPage();
  if (isLoading) {
    return (
      <>
        <p className="!mb-4 flex items-center justify-center gap-2 !text-green-800" role="status">
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
    <div className="!space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <h2 className="font-bold !text-2xl">الاوردرات</h2>

        <input
          type="text"
          placeholder="ابحث باسم العميل أو رقم الطلب"
          className="border !rounded-xl !px-4 !py-2 w-full sm:w-80"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="!space-y-4">
        {error ? (
          <div className="!rounded-xl !bg-red-50 p-5 text-center !text-red-800" role="alert">
            <p>{getApiErrorMessage(error, "تعذر تحميل الطلبات")}</p>
            <button type="button" onClick={reload} className="mt-3 rounded-lg border border-red-300 px-4 py-2">
              إعادة المحاولة
            </button>
          </div>
        ) : filteredOrders?.length ? filteredOrders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onEdit={() => handleEdit(order)}
            onDetails={() => handleDetails(order)}
          />
        )) : (
          <p className="!py-8 text-center !text-gray-600">
            {search ? "لا توجد طلبات تطابق البحث" : "لا توجد طلبات مضافة حتى الآن"}
          </p>
        )}
      </div>

      {editOpen && selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={closeEdit}
        />
      )}

      {detailsOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeDetails}
        />
      )}
    </div>
  );
};

export default React.memo(OrdersPage);
