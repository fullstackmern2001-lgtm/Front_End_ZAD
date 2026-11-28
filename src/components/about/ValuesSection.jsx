import React from "react";

const ValuesSection = () => (
  <section
    className="!bg-gradient-to-br !from-green-900 !via-green-800 !to-green-700 !px-5 !py-16 !text-white md:!py-24"
    dir="rtl"
  >
    <div className="!mx-auto !max-w-5xl text-right">
      <h2 className="text-2xl font-extrabold leading-relaxed md:text-3xl">
        تجسيدًا لقيمنا الإسلامية، سنقوم بحشد الموارد، وبناء الشراكات، وتطوير
        القدرات المحلية، من خلال عملنا على:
      </h2>
      <ul className="!mt-8 !space-y-5 text-base leading-8 !text-green-50 md:text-lg">
        <li>
          تمكين المجتمعات المحلية من التخفيف من آثار الكوارث، والاستعداد
          لوقوعها، والاستجابة لها من خلال توفير الإغاثة، والحماية، والتعافي.
        </li>
        <li>
          تعزيز التنمية المتكاملة، ورعاية البيئة، مع التركيز على سبل العيش
          المستدامة.
        </li>
        <li>
          دعم المهمشين والضعفاء في التعبير عن احتياجاتهم ومعالجة الأسباب الجذرية
          للفقر.
        </li>
      </ul>
    </div>
  </section>
);

export default ValuesSection;
