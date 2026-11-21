import { FaHeart } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import useFavoriteCard from "../../../hook/wishlist/useFavoriteCard";
const FavoriteCard = ({ service }) => {
  const { isFav, priceValue, isBouncing, handleToggle } =
    useFavoriteCard(service);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col">
      {/* الصورة */}
      <Link to={`/service/${service._id}`}>
        <img
          src={service.image}
          alt={service.name}
          className="h-48 w-full object-cover"
        />
      </Link>

      {/* المحتوى */}
      <div className="p-4 flex flex-col flex-1">
        <Link to={`/service/${service._id}`}>
          <h4 className="font-semibold text-lg truncate !text-[#333]">
            {service.name}
          </h4>
        </Link>

        <p className="text-gray-600 text-sm mt-1 truncate">
          {service.description}
        </p>

        {/* السعر */}
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="font-bold text-black">
              ${priceValue.toFixed(2)}
            </span>
          </div>

          {/* أزرار المفضلة + السلة */}
          <div className="flex gap-2">
            <button
              onClick={handleToggle}
              className={`p-2 rounded-full transition-transform duration-300 ${
                isFav ? "text-red-500" : "text-gray-500 hover:text-red-500"
              } ${isBouncing ? "scale-125" : "scale-100"}`}
            >
              <FaHeart />
            </button>
          </div>
        </div>

        <div className="mt-2 text-gray-500 text-xs">
          أقل كمية: {service.minQuantity}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FavoriteCard);
