import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import img1 from "../../assets/Projects02/img01.jpg";
const AboutSection = () => {
  return (
    <section className="w-full bg-white !py-16 md:!py-24 overflow-hidden">
      <div className="container !mx-auto !px-5 md:!px-8 lg:!px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative group order-1 lg:order-2">
            <div className="relative overflow-hidden !rounded-2xl shadow-xl transition-all duration-700 ease-out group-hover:-translate-y-3">
              <img
                src={img1}
                alt="شركة زاد الخير"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-green-900/10 !rounded-2xl -z-10"></div>
          </div>

          {/* Text Side */}
          <div className="order-2 lg:order-1 text-right">
            <span className="inline-block !text-green-700 font-bold text-lg !mb-3">
              تعرف علينا
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900 !mb-6">
              من نحن
            </h2>

            <div className="w-20 h-1 bg-green-900 !rounded-full !mb-7 !mr-0 !ml-auto"></div>

            <p className="text-gray-700 text-base md:text-lg leading-9 text-justify">
              <strong className="text-green-900">شركة زاد الخير</strong> هي شركة
              تجارية ذات مسؤولية محدودة تأسست عام 2022 م تختص بخدمات حفر الآبار
              وبناء المساجد وتنفيذ الأضاحي وتوزيع المصحف الشريف عبر منصاتها
              الإلكترونية، حيث تقوم بالبحث وتحديد المواقع الأكثر حاجة لمشاريع
              حفر الآبار وبناء المساجد وترميمها وبناء الفصول الدراسية والمشاريع
              التنموية كافة، وتشرف على بنائها وتنفيذها عبر مكاتبها الفرعية أو من
              خلال شراكات بناءة مع الشركات والمؤسسات ذات العلاقة.
            </p>

            <div className="!mt-9">
              <button
                onClick={() => (window.location.href = "/about")}
                className="inline-flex items-center gap-3 bg-green-900 hover:bg-green-700 text-white font-bold !px-8 !py-4 !rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                تعرف على المزيد
                <FaArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
