import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import useServices from "../../hook/service/useServices";
import ServiceCard from "./ServiceCard";

const ServicesSection = () => {
  const { services, isLoading, error, reload } = useServices();
  const visibleServices = services.slice(0, 4);

  return (
    <section className="bg-[#f0fdf4] !px-5 !py-16 md:!py-24" dir="rtl">
      <div className="container !mx-auto">
        <div className="!mb-12 text-center">
          <span className="font-bold text-green-700">خدماتنا</span>
          <h2 className="!mt-3 text-3xl font-extrabold text-green-900 md:text-5xl">
            الخدمات الأكثر تنفيذًا
          </h2>
          <p className="!mt-4 leading-8 text-gray-600">
            اختر خدمتك وساهم معنا في صناعة أثر من الخير.
          </p>
        </div>
        {isLoading ? (
          <div
            className="flex items-center justify-center gap-2 !py-10 text-gray-600"
            role="status"
          >
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            جاري تحميل الخدمات...
          </div>
        ) : error ? (
          <div className="!py-10 text-center text-red-700" role="alert">
            <p>{error}</p>
            <button
              type="button"
              onClick={reload}
              className="!mt-4 !rounded-lg border border-red-300 !px-4 !py-2 font-semibold"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : visibleServices.length ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
            <div className="!mt-10 text-center">
              <Link
                to="/services"
                className="!rounded-xl border-2 !text-green-700 border-green-700 !px-8 !py-3 font-bold text-green-700 transition hover:bg-green-700 hover:!text-white"
              >
                عرض جميع الخدمات
              </Link>
            </div>
          </>
        ) : (
          <p className="!py-10 text-center text-gray-600">
            لا توجد خدمات مضافة حتى الآن
          </p>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
