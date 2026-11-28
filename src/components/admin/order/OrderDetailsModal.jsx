import Modal from "../Modal";
import React from "react";
import { getPaymentMethodLabel } from "../../../utils/paymentMethodLabel";

const OrderDetailsModal = ({ order, onClose }) => {
  const fullName = order?.user?.firstName + " " + order?.user?.lastName;

  return (
    <Modal onClose={onClose}>
      <div className="max-w-3xl w-full">
        <h2 className="!text-xl !font-bold !mb-6">تفاصيل الطلب</h2>

        {/* معلومات المستخدم */}
        <div className="flex flex-col sm:flex-row items-center gap-4 border !rounded-xl !p-4">
          <img
            src={order?.user?.avatar}
            alt="avatar"
            className="w-20 h-20 !rounded-full object-cover border"
          />

          <div className="text-center sm:text-left !space-y-1">
            <p className="!font-bold !text-lg">{fullName}</p>

            <p className="!text-sm !text-gray-700">📧 {order?.user?.email}</p>

            <p className="!text-sm !text-gray-700">📞 {order?.user?.phone}</p>
          </div>
        </div>

        {/* معلومات الطلب */}
        <div className="grid sm:grid-cols-2 gap-4 !mt-6 text-sm">
          <p>
            <b>رقم الطلب:</b> <span dir="ltr">{order._id}</span>
          </p>

          <p>
            <b>طريقة الدفع:</b>{" "}
            {getPaymentMethodLabel(order.paymentMethodType)}
          </p>

          <p>
            <b>السعر الكلي:</b> ${order.totalOrderPrice}
          </p>

          <p>
            <b>الحالة:</b> {order.isPaid ? "✅ مدفوع" : "❌ غير مدفوع"}
          </p>
        </div>

        {/* الخدمات */}
        <h3 className="font-bold !mt-6 !mb-3">الخدمات</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {order.cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 border !rounded-xl !p-3"
            >
              <img
                src={item.serviceImage || item.service?.image}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div className="flex-1 text-sm">
                <p className="font-semibold">{item.serviceName || item.service?.name || "الخدمة"}</p>

                <p className="!text-gray-600">الكمية: {item.quantity}</p>
                <p className="!text-gray-600">أقل كمية: {item.minQuantity ?? 1}</p>
                <p className="font-bold">${Number(item.totalItemPrice ?? item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* زر الاغلاق */}
        <div className="flex justify-end !mt-6">
          <button
            onClick={onClose}
            className="!px-6 !py-2 !bg-green-900 !text-white !rounded-xl"
          >
            اغلاق
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(OrderDetailsModal);
