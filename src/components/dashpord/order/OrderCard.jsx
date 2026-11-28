import React from "react";

const OrderCard = ({ item }) => {
  const service = item.service;
  const price = Number(item.price ?? 0);
  const totalItemPrice = Number(item.totalItemPrice ?? price * Number(item.quantity || 0));

  return (
    <div className="flex gap-3 bg-green-50 !p-3 rounded-xl hover:shadow transition">
      <img
        src={item.serviceImage || service?.image}
        alt={item.serviceName || service?.name || "الخدمة"}
        className="w-20 h-20 rounded-lg object-cover"
      />

      <div className="flex-1">
        <h6 className="text-sm md:text-base font-semibold">
          {item.serviceName || service?.name || "الخدمة"}
        </h6>
        <p className="text-xs text-gray-600">الكمية: {item.quantity}</p>
        <p className="text-xs text-gray-600">أقل كمية: {item.minQuantity ?? 1}</p>
      </div>

      <div className="font-bold text-sm md:text-base">
        ${totalItemPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default React.memo(OrderCard);
