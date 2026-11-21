import React from "react";
const OrderCard = ({ order, onEdit, onDetails }) => {
  const fullName = order?.user?.firstName + " " + order?.user?.lastName;

  return (
    <div className="!bg-white !rounded-2xl shadow !p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="!space-y-1">
        <h3 className="!font-bold !text-lg">{fullName}</h3>

        <p className="!font-bold">
          رقم الطلب:{" "}
          <span dir="ltr" className="inline-block">
            {order._id}
          </span>
        </p>

        <p className="text-sm">
          السعر الكلي:
          <span className="!font-bold !ml-1">${order.totalOrderPrice}</span>
        </p>

        <p className="text-sm">
          الدفع:
          <span
            className={`!ml-2 !font-bold ${
              order.isPaid ? "!text-gray-700" : "!text-red-500"
            }`}
          >
            {order.isPaid ? "تم الدفع" : "غير مدفوع"}
          </span>
        </p>

        <p className="text-sm">
          تنفيذ الخدمة:
          <span
            className={`!ml-2 font-bold ${
              order.isDelivered ? "!text-gray-700" : "!text-gray-600"
            }`}
          >
            {order.isDelivered ? "تم التنفيذ" : "قيد التنفيذ"}
          </span>
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onDetails}
          className="!px-4 !py-2 !rounded-xl !bg-green-900 !text-white !text-sm"
        >
          عرض المزيد
        </button>

        <button
          onClick={onEdit}
          className="!px-4 !py-2 !rounded-xl !bg-green-900 !text-white !text-sm"
        >
          تعديل حالة التنفيذ
        </button>
      </div>
    </div>
  );
};

export default React.memo(OrderCard);
