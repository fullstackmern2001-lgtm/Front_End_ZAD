import React from "react";

const MediaHero = () => (
  <section
    className="page-hero bg-green-900 !px-5 !py-20 text-center text-white md:!py-28"
    dir="rtl"
  >
    <div className="mx-auto max-w-4xl">
      <span className="!mb-4 inline-block !rounded-full bg-white/15 !px-5 !py-2 text-sm font-bold">
        أخبار ومبادرات زاد الخير
      </span>
      <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
        المركز الإعلامي
      </h1>
      <p className="!mx-auto !mt-5 max-w-2xl text-base leading-8 text-green-50 md:text-lg">
        تابع آخر أخبارنا ومشاريعنا ومبادراتنا الخيرية، وكن قريبًا من أثر عطائكم.
      </p>
    </div>
  </section>
);

export default MediaHero;
