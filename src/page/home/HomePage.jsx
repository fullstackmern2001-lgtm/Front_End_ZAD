import React from "react";
import SliderSection from "../../components/home/SliderSection";
import { FaWhatsapp } from "react-icons/fa";
import AboutUs from "../../components/home/AboutUs";
import ServicesSection from "../../components/service/ServicesSection";
import NewsSection from "../../components/home/NewsSection";
import ProofsSection from "../../components/home/ProofsSection";
import ReviewsSection from "../../components/home/ReviewsSection";
import WorksNumbers from "../../components/home/WorksNumbers";
const HomePage = () => {
  return (
    <section className="bg-white !mt-0 !pt-[84px]">
      <SliderSection />
      <AboutUs />
      <ServicesSection />
      <ProofsSection />
      <NewsSection />
      <ReviewsSection />
      <WorksNumbers />

      <div className="">
        <a
          href="https://wa.me/962790013732"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معنا عبر واتساب"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#1da851]"
          dir="rtl"
        >
          <FaWhatsapp className="text-2xl" />
          <span>تواصل معنا</span>
        </a>
      </div>
    </section>
  );
};

export default React.memo(HomePage);
