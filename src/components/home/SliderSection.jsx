import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import { LoaderCircle } from "lucide-react";
import useHomeSliders from "../../hook/slider/useHomeSliders";
const SliderSection = () => {
  const { sliders, isFetching, error, reload } = useHomeSliders();

  return (
    <Container fluid className="!p-0 !m-0">
      {isFetching ? (
        <div className="flex min-h-64 items-center justify-center gap-2 text-green-800" role="status">
          <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
          جاري تحميل العروض...
        </div>
      ) : error ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-red-700" role="alert">
          <p>تعذر تحميل العروض، يرجى المحاولة مرة أخرى</p>
          <button type="button" onClick={reload} className="!rounded-lg border border-red-300 !px-4 !py-2">
            إعادة المحاولة!
          </button>
        </div>
      ) : sliders?.length ? (
      <Carousel fade interval={4000} pause="hover">
        {sliders?.map((slide, index) => (
          <Carousel.Item
            key={index}
            className="relative h-[60vh] md:h-[55vh] lg:h-[80vh]"
          >
            {/* image */}
            <img
              className="w-100 h-full object-cover brightness-90"
              src={slide.image}
              alt={slide.name}
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-green-900/50"></div>

            {/* caption */}
            <Carousel.Caption className="flex flex-col items-center justify-center bottom-[20%] !px-4">
              <h2 className="text-white font-bold tracking-wide !mb-3 text-xl md:text-3xl lg:text-4xl">
                {slide.name}
              </h2>

              <p className="text-white opacity-90 !mb-4 max-w-xl text-sm md:text-base leading-relaxed">
                {slide.des}
              </p>

              <Button
                as={Link}
                to="/services"
                className="
                hero-cta
                bg-white
                text-green-900
                border-0
                !px-6
                !py-2
                md:!px-8
                md:!py-3
                !rounded-full
                font-semibold
                transition
                duration-300
                hover:bg-green-700
                hover:text-white
                hover:-translate-y-1
                shadow-lg
                "
              >
                تصفح خدماتنا
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      ) : (
        <p className="!py-12 text-center text-gray-600">لا توجد عروض متاحة حاليًا</p>
      )}
    </Container>
  );
};

export default React.memo(SliderSection);
