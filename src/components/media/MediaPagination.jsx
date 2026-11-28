import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MediaPagination = ({ currentPage, totalPages, onPageChange }) => (
  <nav className="flex items-center justify-center gap-2 bg-green-50 !pb-16" dir="rtl" aria-label="ترقيم صفحات الأخبار">
    <button
      type="button"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      aria-label="الصفحة السابقة"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-700 text-green-700 transition hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      <FaChevronRight />
    </button>
    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
      <button
        type="button"
        key={page}
        onClick={() => onPageChange(page)}
        className={`h-10 w-10 rounded-lg font-bold transition ${
          currentPage === page
            ? "bg-green-900 text-white"
            : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
        }`}
      >
        {page}
      </button>
    ))}
    <button
      type="button"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      aria-label="الصفحة التالية"
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-green-700 text-green-700 transition hover:bg-green-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      <FaChevronLeft />
    </button>
  </nav>
);

export default MediaPagination;
