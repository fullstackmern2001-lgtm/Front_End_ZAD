import { Link } from "react-router-dom";
import img from "../../assets/category/bag.png";
import React from "react";
const BannerSection = () => {
  return (
    <section className="relative !px-4 sm:!px-6 lg:!px-8 !py-12">
      {/* Background Image */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
        <img src={img} alt="Promotion" className="w-full h-full object-cover" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-green-900/30 flex flex-col sm:flex-row items-center justify-center sm:justify-between !px-6 sm:!px-12">
          {/* Text */}
          <div className="text-center sm:text-left text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">
              خصم 50% على تشكيلتنا الجديدة
            </h2>
            <p className="text-sm sm:text-base mb-4">
              اغتنم الفرصة قبل انتهاء العرض!
            </p>
          </div>

          {/* Button */}
          <Link
            to="/shop"
            className="!px-6 !py-3 bg-green-400 text-black font-semibold rounded hover:bg-green-700 transition"
          >
            تسوق الآن
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(BannerSection);
