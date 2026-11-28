import React from "react";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

const MediaCard = ({ article }) => {
  const date = new Date(article.publishedAt).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="media-card group overflow-hidden !rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-green-900 !px-3 !py-2 text-xs font-bold text-white">
          <FaCalendarAlt />
          {date}
        </span>
      </div>
      <div className="!p-6 text-right">
        <span className="text-sm font-bold text-green-700">
          أخبار زاد الخير
        </span>
        <h2 className="!mt-3 text-xl font-extrabold leading-relaxed text-green-900">
          {article.title}
        </h2>
        <p className="!mt-3 line-clamp-2 text-sm leading-7 text-gray-600">
          {article.description}
        </p>
        <button
          type="button"
          className="!mt-5 flex items-center gap-2 font-bold text-green-700 transition hover:text-green-900"
        >
          أكمل القراءة
          <FaArrowLeft />
        </button>
      </div>
    </article>
  );
};

export default MediaCard;
