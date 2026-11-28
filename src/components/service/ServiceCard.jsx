import React from "react";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const displayPrice = Number(service?.price ?? 0);

  return (
    <article className="service-card group overflow-hidden !rounded-2xl bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <Link to={`/service/${service._id}`}>
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="!p-5 text-right" dir="rtl">
        <h3 className="!mt-2 min-h-[3.5rem] text-xl font-extrabold leading-snug text-green-900">
          {service.name}
        </h3>
        <p className="!mt-2 min-h-14 text-sm leading-7 text-gray-600">
          {service.description}
        </p>
        <div className="!mt-5 flex items-center justify-between border-t border-green-100 !pt-4">
          <span className="text-lg font-extrabold text-green-700">
            {displayPrice.toFixed(2)} $
          </span>
          <Link
            to={`/service/${service._id}`}
            className="flex items-center gap-2 !rounded-xl bg-green-900 !px-4 !py-2 text-sm font-bold text-white transition hover:bg-green-700"
          >
            التفاصيل <FaArrowLeft />
          </Link>
        </div>
        <span className="!mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
          <FaShoppingCart /> أقل كمية: {service.minQuantity}
        </span>
      </div>
    </article>
  );
};

export default ServiceCard;
