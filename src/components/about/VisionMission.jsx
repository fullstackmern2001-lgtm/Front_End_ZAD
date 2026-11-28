import React from "react";
import { FaBullseye, FaEye } from "react-icons/fa";

const VisionMission = () => (
  <section className="bg-green-50 !px-5 !py-16 md:!py-24" dir="rtl">
    <div className="mx-auto max-w-6xl">
      <div className="!mx-auto !mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold text-green-900 md:text-4xl">
          نصنع الخير بأثر مستدام
        </h2>
        <p className="!mt-4 leading-8 text-gray-600">
          نسعى إلى خدمة الإنسان وتعزيز التنمية في المجتمعات المحتاجة.
        </p>
      </div>
      <div className="grid gap-7 md:grid-cols-2">
        <article className="!rounded-3xl bg-green-900 !p-8 text-right text-white shadow-lg">
          <FaEye className="!mb-6 text-4xl text-green-100" />
          <h3 className="text-2xl font-extrabold">رؤيتنا</h3>
          <p className="!mt-4 leading-8 text-green-50">
            مجتمعات قادرة، مزدهرة، ومتكافلة، يعيش أفرادها بكرامة وأمان.
          </p>
        </article>
        <article className="!rounded-3xl bg-green-100 !p-8 text-right text-green-900 shadow-lg">
          <FaBullseye className="!mb-6 text-4xl text-green-700" />
          <h3 className="text-2xl font-extrabold">رسالتنا</h3>
          <p className="!mt-4 leading-8 text-gray-700">
            تقديم حلول إنسانية وتنموية فعالة بالشراكة مع المجتمعات المحلية.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default VisionMission;
