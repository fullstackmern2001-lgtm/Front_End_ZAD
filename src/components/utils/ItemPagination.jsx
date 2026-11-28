const ItemPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  ariaLabel = "صفحات العناصر",
  disabled = false,
  className = "",
}) => {
  if (!Number.isInteger(totalPages) || totalPages <= 1) return null;

  return (
    <nav
      className={`!mt-8 flex flex-wrap items-center justify-center gap-2 ${className}`}
      aria-label={ariaLabel}
      dir="rtl"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        className="min-h-10 rounded-lg border border-green-200 bg-white !px-4 text-green-800 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        السابقة
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            disabled={disabled}
            aria-current={pageNumber === currentPage ? "page" : undefined}
            aria-label={`الصفحة ${pageNumber}`}
            className={`min-h-10 min-w-10 rounded-lg !px-3 disabled:cursor-not-allowed disabled:opacity-50 ${
              pageNumber === currentPage
                ? "bg-green-900 text-white"
                : "border border-green-200 bg-white text-green-800 hover:bg-green-100"
            }`}
          >
            {pageNumber}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        className="min-h-10 rounded-lg border border-green-200 bg-white !px-4 text-green-800 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        التالية
      </button>
      <span className="!mr-2 text-sm text-gray-600">
        صفحة {currentPage} من {totalPages}
      </span>
    </nav>
  );
};

export default ItemPagination;
