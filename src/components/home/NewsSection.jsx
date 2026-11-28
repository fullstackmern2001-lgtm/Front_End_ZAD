import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCalendarAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { NewsFeatureSkeleton } from "../utils/ContentSkeletons";
import useNewsSection from "../../hook/news/useNewsSection";
import { LoaderCircle } from "lucide-react";

const NewsSection = () => {
  const { news, isLoading, error, reload, formatDate } = useNewsSection();

  return (
    <section
      className="w-full bg-green-50 !py-16 md:!py-24 overflow-hidden"
      dir="rtl"
    >
      <div className="container !mx-auto !px-5 md:!px-8 lg:!px-12">
        {/* Header */}
        <div className="text-center !mb-12 md:!mb-16">
          <span className="!text-green-700 font-bold text-lg">
            آخر المستجدات
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900 !mt-3">
            أخبارنا
          </h2>

          <p className="text-gray-600 text-base md:text-lg !mt-4 leading-8">
            تابع آخر أخبارنا ومشاريعنا ومبادراتنا الخيرية.
          </p>

          <div className="w-20 h-1 bg-green-900 !rounded-full mx-auto !mt-5" />
        </div>

        {/* News Slider */}
        <div className="relative max-w-6xl !mx-auto">
          {isLoading ? (
            <>
              <p
                className="mb-4 flex items-center justify-center gap-2 text-green-800"
                role="status"
              >
                <LoaderCircle
                  className="h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                جاري تحميل الأخبار...
              </p>
              <NewsFeatureSkeleton />
            </>
          ) : error ? (
            <div className="!py-8 text-center text-red-600" role="alert">
              <p>{error}</p>
              <button
                type="button"
                onClick={reload}
                className="!mt-3 !rounded-lg border border-red-300 !px-4 !py-2"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : news.length === 0 ? (
            <p className="!py-8 text-center text-gray-600">
              لا توجد أخبار حاليًا.
            </p>
          ) : (
            <Carousel
              indicators={true}
              controls={true}
              interval={5000}
              pause="hover"
              touch={true}
              prevIcon={
                <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 !rounded-full bg-green-900 text-white shadow-lg hover:bg-green-700 transition-all duration-300">
                  <FaArrowRight className="text-lg" />
                </span>
              }
              nextIcon={
                <span className="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 !rounded-full bg-green-900 text-white shadow-lg hover:bg-green-700 transition-all duration-300">
                  <FaArrowLeft className="text-lg" />
                </span>
              }
              className="news-carousel"
            >
              {news.map((item) => (
                <Carousel.Item key={item._id}>
                  <div className="!px-3 !py-5 md:!px-8">
                    <div className="group bg-white !rounded-2xl overflow-hidden border border-green-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image */}
                        <div className="relative h-64 sm:h-80 md:h-[390px] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />

                          <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/10 transition-all duration-500" />

                          {/* Date */}
                          <div className="absolute top-4 right-4 bg-green-900 text-white !px-4 !py-2 !rounded-lg text-sm font-bold shadow-md flex items-center gap-2">
                            <FaCalendarAlt />
                            {formatDate(item.publishedAt)}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="!p-6 md:!p-8 lg:!p-10 flex flex-col justify-center text-right">
                          <span className="!text-green-700 font-bold text-sm !mb-4">
                            أخبار زاد الخير
                          </span>

                          <h3 className="text-2xl md:text-3xl font-extrabold text-green-900 leading-relaxed !mb-5 group-hover:!text-green-700 transition-colors duration-300">
                            {item.title}
                          </h3>

                          <p className="text-gray-600 text-base leading-8 !mb-7">
                            {item.description}
                          </p>

                          <button
                            type="button"
                            className="flex items-center gap-3 !text-green-700 font-bold hover:!text-green-800 transition-colors w-fit"
                          >
                            اقرأ المزيد
                            <FaArrowLeft />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
