import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LoaderCircle } from "lucide-react";
import useProofs from "../../hook/proof/useProofs";

const ProofsSection = () => {
  const { proofs, isLoading, error, reload } = useProofs(1, 5);

  if (!isLoading && !error && proofs.length === 0) return null;

  return (
    <section
      className="w-full overflow-hidden bg-[#f5f8f7] !py-16 md:!py-24"
      dir="rtl"
    >
      <div className="container !mx-auto !px-5 md:!px-8 lg:!px-12">
        <div className="!mb-10 text-center md:!mb-14">
          <span className="text-lg font-bold text-[#287c91]">
            أثرنا على أرض الواقع
          </span>
          <h2 className="!mt-3 text-3xl font-extrabold text-[#174b5a] md:text-4xl lg:text-5xl">
            توثيقات من مشاريعنا
          </h2>
          <p className="mx-auto !mt-4 max-w-2xl leading-8 text-gray-600">
            نشارككم صورًا وقصصًا توثق أثر الخدمات التي تصل إلى مستحقيها.
          </p>
          <div className="!mx-auto !mt-5 h-1 w-20 !rounded-full bg-[#174b5a]" />
        </div>

        {isLoading ? (
          <div
            className="flex min-h-56 items-center justify-center gap-2 text-[#174b5a]"
            role="status"
          >
            <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
            جاري تحميل التوثيقات...
          </div>
        ) : error ? (
          <div className="!py-8 text-center text-red-700" role="alert">
            <p>{error}</p>
            <button
              type="button"
              onClick={reload}
              className="!mt-3 !rounded-lg border border-red-300 !px-4 !py-2"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl">
            <Carousel
              fade
              interval={proofs.length > 1 ? 6000 : null}
              pause="hover"
              touch
              controls={proofs.length > 1}
              indicators={proofs.length > 1}
              prevIcon={
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#174b5a] text-white shadow-lg">
                  <FaArrowRight />
                </span>
              }
              nextIcon={
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#174b5a] text-white shadow-lg">
                  <FaArrowLeft />
                </span>
              }
            >
              {proofs.map((proof) => (
                <Carousel.Item key={proof._id}>
                  <article className="proof-animate group mx-2 mb-7 overflow-hidden rounded-2xl border border-[#ddf1f2] bg-white shadow-md transition duration-500 hover:-translate-y-1 hover:shadow-xl md:mx-8">
                    <div className="grid md:grid-cols-2">
                      <div className="h-64 overflow-hidden sm:h-80 md:h-[360px]">
                        <img
                          src={proof.image}
                          alt={proof.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col justify-center !p-6 text-right sm:!p-8 md:!p-10">
                        <span className="font-bold text-[#6a9f3d]">
                          توثيق مشروع
                        </span>
                        <h3 className="!mt-3 text-2xl font-extrabold text-[#174b5a] md:text-3xl">
                          {proof.title}
                        </h3>
                        <p className="!mt-4 whitespace-pre-line leading-8 text-gray-600">
                          {proof.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </Carousel.Item>
              ))}
            </Carousel>

            <div className="!mt-8 text-center">
              <Link
                to="/proofs"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-[#287c91] !px-7 !py-3 font-bold text-[#174b5a] transition duration-300 hover:-translate-y-1 hover:bg-[#174b5a] hover:text-white"
              >
                عرض المزيد من التوثيقات
                <FaArrowLeft />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProofsSection);
