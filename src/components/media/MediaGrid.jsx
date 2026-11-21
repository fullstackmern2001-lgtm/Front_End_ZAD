import React from "react";
import MediaCard from "./MediaCard";

const MediaGrid = ({ articles }) => (
  <section className="bg-green-50 !px-5 !py-16 md:!px-8 md:!py-24" dir="rtl">
    <div className="mx-auto max-w-7xl">
      <div className="mb-12 text-center">
        <span className="font-bold text-green-700">اضافه على أعمالنا</span>
        <h2 className="!mt-3 text-3xl font-extrabold text-green-900 md:text-4xl">
          آخر الأخبار
        </h2>
        <div className="!mx-auto !mt-5 h-1 w-20 rounded-full bg-green-900" />
      </div>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <MediaCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  </section>
);

export default MediaGrid;
