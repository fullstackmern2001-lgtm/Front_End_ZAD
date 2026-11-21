import React from "react";
import Carousel from "react-bootstrap/Carousel";

const countries = [
  { name: "تركيا", flag: "tr" },
  { name: "فلسطين", flag: "ps" },
  { name: "الأردن", flag: "jo" },
  { name: "سوريا", flag: "sy" },
  { name: "لبنان", flag: "lb" },
  { name: "العراق", flag: "iq" },
  { name: "اليمن", flag: "ye" },
  { name: "مصر", flag: "eg" },
  { name: "السودان", flag: "sd" },
  { name: "الصومال", flag: "so" },
  { name: "ليبيا", flag: "ly" },
  { name: "تونس", flag: "tn" },
];

const countrySlides = Array.from(
  { length: Math.ceil(countries.length / 6) },
  (_, index) => countries.slice(index * 6, index * 6 + 6),
);

const CountriesSlider = () => (
  <section className="bg-green-50 !px-5 !py-16 md:py-24" dir="rtl">
    <div className="mx-auto max-w-7xl text-center">
      <span className="font-bold text-green-700">
        الدول التي نقوم بتنفيذ مشاريعنا بها
      </span>
      <h2 className="!mt-3 text-3xl font-extrabold text-green-900 md:text-4xl">
        نطاق عملنا
      </h2>
      <div className="mx-auto !mt-5 h-1 w-20 rounded-full bg-green-900" />
      <Carousel
        interval={3000}
        controls
        indicators={false}
        pause="hover"
        className="mx-auto !mt-10 max-w-6xl"
        prevIcon={
          <span className="flex h-12 w-12 items-center justify-center !rounded-full bg-green-900 text-2xl text-white">
            ›
          </span>
        }
        nextIcon={
          <span className="flex h-12 w-12 items-center justify-center !rounded-full bg-green-900 text-2xl text-white">
            ‹
          </span>
        }
      >
        {countrySlides.map((slide, slideIndex) => (
          <Carousel.Item key={slideIndex}>
            <div className="grid min-h-64 grid-cols-2 gap-3 !rounded-3xl bg-white !p-5 shadow-md sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:p-8">
              {slide.map((country) => (
                <div
                  key={country.flag}
                  className="flex flex-col items-center justify-center rounded-2xl !bg-green-50 !p-3 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={`https://flagcdn.com/w320/${country.flag}.png`}
                    alt={`علم ${country.name}`}
                    className="h-20 w-full !rounded-lg object-cover shadow sm:h-24"
                  />
                  <h3 className="!mt-3 text-base font-extrabold text-green-800">
                    {country.name}
                  </h3>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  </section>
);

export default CountriesSlider;
