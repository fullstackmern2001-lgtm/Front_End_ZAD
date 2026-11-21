import React from "react";
import OrderCard from "./OrderCard";

const OrderSection = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl shadow !p-4 !space-y-4">
      {/* Header Order */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <p className="font-bold">
            رقم الطلب: <span dir="ltr">{order._id}</span>
          </p>
          <p className="text-sm text-gray-600">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3 text-sm">
          <span
            className={`!px-3 py-1 rounded-full ${
              order.isPaid
                ? "bg-green-100 text-gray-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {order.isPaid ? "مدفوع" : "غير مدفوع"}
          </span>

          <span className="!px-3 !py-1 rounded-full bg-green-100 text-gray-700">
            {order.isDelivered ? "تم تنفيذ الخدمة" : "قيد التنفيذ"}
          </span>
        </div>
      </div>

      {/* الخدمات: scrollable */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-auto">
        {order.cartItems.map((item) => (
          <OrderCard key={item._id} item={item} />
        ))}
      </div>

      {/* السعر */}
      <div className="text-right font-bold text-lg border-t !pt-2">
        الإجمالي: ${order.totalOrderPrice}
      </div>
    </div>
  );
};

export default React.memo(OrderSection);
