import React from "react";
import { FaHeart, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const services = [
  {
    id: 1,
    name: "بناء مسجد",
    description:
      "ساهم في بناء مسجد ليكون منارة للعبادة ونشر الخير في المجتمعات المحتاجة.",
    price: 5000,
    image: "/images/mosque.jpg",
  },
  {
    id: 2,
    name: "حفر بئر مياه",
    description:
      "ساهم في توفير مياه نظيفة وصالحة للشرب للأسر والمجتمعات المحتاجة.",
    price: 1500,
    image: "/images/water-well.jpg",
  },
  {
    id: 3,
    name: "ترميم مسجد",
    description:
      "ساهم في ترميم المساجد وتجهيزها لتكون مكاناً مناسباً للصلاة والعبادة.",
    price: 2500,
    image: "/images/renovation.jpg",
  },
  {
    id: 4,
    name: "توزيع المصاحف",
    description:
      "ساهم في إيصال المصحف الشريف إلى المساجد والمراكز التعليمية والمحتاجين.",
    price: 100,
    image: "/images/quran.jpg",
  },
];

const ServicesSection = () => {
  return (
    <section
      className="w-full bg-[#f0fdf4] !py-16 md:!py-24 overflow-hidden"
      dir="rtl"
    >
      <div className="container mx-auto !px-5 md:!px-8 lg:!px-12">
        {/* Section Header */}
        <div className="text-center !mb-12 md:!mb-16">
          <span className="inline-block text-gray-700 font-bold text-lg !mb-3">
            خدماتنا
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-900">
            الخدمات الأكثر تنفيذاً
          </h2>

          <p className="text-gray-600 text-base md:text-lg !mt-4 leading-8">
            لا تتردد في طلب خدمتك والمساهمة في صناعة أثر من الخير.
          </p>

          <div className="w-20 h-1 bg-green-900 rounded-full !mx-auto !mt-5" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white !rounded-2xl overflow-hidden border border-green-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 sm:h-52 lg:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/10 transition-all duration-500" />

                {/* Hover Icons */}
                <div className="absolute top-4 left-4 flex flex-col gap-3 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  {/* Favorite */}
                  <button
                    type="button"
                    aria-label="إضافة للمفضلة"
                    className="w-11 h-11 !rounded-full bg-white text-gray-700 flex items-center justify-center shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
                    <FaHeart className="text-lg" />
                  </button>

                  {/* Cart */}
                  <button
                    type="button"
                    aria-label="إضافة للسلة"
                    className="w-11 h-11 !rounded-full bg-white text-gray-700 flex items-center justify-center shadow-md hover:bg-green-700 hover:text-white transition-all duration-300"
                  >
                    <FaShoppingCart className="text-lg" />
                  </button>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-green-900 text-white !px-4 !py-2 !rounded-lg font-bold shadow-md">
                  {service.price.toLocaleString("en-US")} $
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 text-right">
                <h3 className="text-xl font-extrabold text-green-900 !mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {service.name}
                </h3>

                <p className="text-gray-600 text-sm leading-7 min-h-[84px]">
                  {service.description}
                </p>

                {/* Card Footer */}
                <div className="border-t border-green-100 !mt-5 !pt-4 flex items-center justify-between gap-2">
                  {/* <div>
                    <span className="block text-xs text-gray-500 !mb-1">
                      المبلغ
                    </span>

                    <span className="text-gray-700 font-extrabold text-lg">
                      {service.price.toLocaleString("en-US")} $
                    </span>
                  </div> */}

                  <button
                    type="button"
                    className="flex items-center gap-2 bg-green-900 hover:bg-green-700 text-white !px-4 !py-3 !rounded-xl text-sm font-bold transition-all duration-300"
                  >
                    <FaShoppingCart />
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center !mt-12">
          <button
            type="button"
            className="inline-flex items-center gap-3 border-2 border-green-500 text-gray-700 hover:bg-green-700 hover:text-white !px-8 !py-3.5 !rounded-xl font-bold transition-all duration-300 hover:-translate-y-1"
          >
            عرض جميع الخدمات
            <FaArrowLeft />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
