import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";
import useNewsAdmin from "../../hook/news/useNewsAdmin";
import NewsConfirmModal from "../../components/admin/news/NewsConfirmModal";
import NewsEditModal from "../../components/admin/news/NewsEditModal";

const NewsAdminPage = () => {
  const newsAdmin = useNewsAdmin();
  const { isCreatePage } = newsAdmin;

  return (
    <div className="!space-y-6" dir="rtl">
      <div className="flex flex-col gap-4 !rounded-2xl border !border-[#ddf1f2] bg-white !p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-[#174b5a]">
          {isCreatePage ? "إضافة خبر" : "إدارة الأخبار"}
        </h2>
        <Link
          to={isCreatePage ? "/admin/news" : "/admin/news/new"}
          className="!rounded-xl border border-[#174b5a] !px-5 !py-3 font-semibold text-[#174b5a] transition hover:bg-[#f5f8f7]"
        >
          {isCreatePage ? "عرض كل الأخبار" : "إضافة خبر"}
        </Link>
      </div>

      {isCreatePage && <form
        onSubmit={newsAdmin.handleCreate}
        className="!space-y-3 !rounded-2xl bg-white !p-5 shadow"
      >
        <h3 className="text-lg font-bold">إضافة خبر جديد</h3>
        <label htmlFor="news-title" className="block font-semibold">
          عنوان الخبر
        </label>
        <input
          id="news-title"
          name="title"
          className="w-full !rounded-xl border !p-3"
          placeholder="أدخل عنوان الخبر"
          value={newsAdmin.form.title}
          onChange={newsAdmin.handleChange}
        />
        <label htmlFor="news-description" className="block font-semibold">
          وصف الخبر
        </label>
        <textarea
          id="news-description"
          name="description"
          className="w-full !rounded-xl border !p-3"
          rows="5"
          placeholder="أدخل وصف الخبر"
          value={newsAdmin.form.description}
          onChange={newsAdmin.handleChange}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <label htmlFor="news-published-at" className="block font-semibold">
            تاريخ النشر
          </label>
          <label htmlFor="news-image" className="block font-semibold">
            صورة الخبر
          </label>
          <input
            id="news-published-at"
            name="publishedAt"
            type="date"
            className="!rounded-xl border !p-3"
            value={newsAdmin.form.publishedAt}
            onChange={newsAdmin.handleChange}
          />
          <input
            id="news-image"
            name="image"
            type="file"
            accept="image/*"
            className="!rounded-xl border !p-3"
            onChange={newsAdmin.handleChange}
          />
        </div>
        {newsAdmin.form.imagePreview && (
          <img
            src={newsAdmin.form.imagePreview}
            alt="معاينة الخبر"
            className="h-52 w-full !rounded-xl object-cover"
          />
        )}
        <button
          type="submit"
          disabled={newsAdmin.loading}
          className="flex items-center gap-2 !rounded-xl bg-green-900 !px-6 !py-3 font-bold text-white disabled:opacity-70"
        >
          {newsAdmin.loading ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              جاري الحفظ...
            </>
          ) : (
            "إضافة خبر"
          )}
        </button>
      </form>}

      {!isCreatePage && newsAdmin.loadError && (
        <div className="!rounded-xl !bg-red-50 !p-4 !text-red-800" role="alert">
          <p>{newsAdmin.loadError}</p>
          <button
            type="button"
            onClick={newsAdmin.loadNews}
            disabled={newsAdmin.isFetching}
            className="!mt-3 !rounded-lg border !border-red-300 !px-4 !py-2 font-semibold"
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      {!isCreatePage && newsAdmin.isFetching && (
        <p className="flex items-center justify-center gap-2 !py-4 !text-green-800" role="status">
          <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
          جاري تحميل الأخبار...
        </p>
      )}

      {!isCreatePage && <div className="grid gap-4 md:grid-cols-2">
        {newsAdmin.isFetching && !newsAdmin.news.length
          ? null
          : newsAdmin.loadError
            ? null
            : newsAdmin.news.length ? (
            newsAdmin.news.map((item) => (
            <article
              key={item._id}
              className="overflow-hidden !rounded-2xl bg-white shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover"
              />
              <div className="!space-y-3 !p-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-7 text-gray-700">
                  {item.description}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCalendarAlt />
                  {new Date(item.publishedAt).toLocaleDateString("ar-EG")}
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => newsAdmin.startEditing(item)}
                    className="!rounded-lg bg-green-900 !px-4 !py-2 text-white"
                  >
                    تعديل
                  </button>
                  <button
                    type="button"
                    onClick={() => newsAdmin.requestDelete(item._id)}
                    className="!rounded-lg !bg-red-600 !px-4 !py-2 text-white"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </article>
          ))
            ) : (
              <p className="!py-6 text-center text-gray-600 md:col-span-2">
                لا توجد أخبار مضافة حتى الآن
              </p>
            )}
      </div>}

      {!isCreatePage && newsAdmin.editingNews && (
        <NewsEditModal
          form={newsAdmin.form}
          loading={newsAdmin.loading}
          onChange={newsAdmin.handleChange}
          onSubmit={newsAdmin.handleEditSubmit}
          onClose={newsAdmin.closeEdit}
        />
      )}

      {!isCreatePage && newsAdmin.confirmType && (
        <NewsConfirmModal
          type={newsAdmin.confirmType}
          loading={newsAdmin.loading}
          onConfirm={newsAdmin.confirmAction}
          onClose={newsAdmin.closeConfirmation}
        />
      )}
    </div>
  );
};

export default React.memo(NewsAdminPage);
