import React from "react";

const ContactHero = () => (
  <section
    className="page-hero bg-gradient-to-l from-green-900 to-green-700 !px-5 !py-20 text-center text-white md:py-28"
    dir="rtl"
  >
    <span className="mb-4 inline-block rounded-full bg-white/15 !px-5 !py-2 text-sm font-bold">
      نحن هنا لخدمتكم
    </span>
    <h1 className="text-4xl font-extrabold md:text-6xl">تواصل معنا</h1>
    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-green-50 md:text-lg">
      يسعدنا استقبال رسائلكم واستفساراتكم، وسنكون دائمًا قريبين منكم.
    </p>
  </section>
);

export default ContactHero;
