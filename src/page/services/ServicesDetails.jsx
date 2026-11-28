import React from "react";
import ServicesGallery from "../../components/service/ServicesGallery";
import ServicesInfo from "../../components/service/ServicesInfo";
import ServicesReviews from "../../components/service/ServicesReviews";
import { Link } from "react-router-dom";
import FavoriteCard from "../../components/dashpord/favorite/FavoriteCard";
import { ServiceCardSkeleton } from "../../components/utils/ContentSkeletons";
import useServicesDetails from "../../hook/service/useServicesDetails";

const ServicesDetails = () => {
  const { id, service, similarServices, isLoading, refreshService } =
    useServicesDetails();
  return (
    <div className="container !py-5 !mt-[100px]">
      <div className="row g-4">
        {/* صور الخدمة */}
        <div className="col-lg-6">
          <ServicesGallery service={service} />
        </div>

        {/* معلومات الخدمة */}
        <div className="col-lg-6">
          <ServicesInfo service={service} />
        </div>
      </div>

      {/* التقييمات والتعليقات */}
      <div className="!mt-5">
        <ServicesReviews serviceId={id} onReviewChange={refreshService} />
      </div>

      <div className="!my-10">
        <div className="flex items-center justify-between">
          <Link to="/services" className="text-[#333]">
            <button className="border border-green-800 text-sm !px-4 !py-2 rounded hover:bg-green-700 hover:text-white transition">
              المزيد
            </button>
          </Link>
          <h5 className="text-[16px] sm:text-2xl font-semibold text-green-800">
            خدمات مشابهة
          </h5>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 !mt-5">
          {isLoading ? (
            <>
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
              <ServiceCardSkeleton />
            </>
          ) : similarServices?.length > 0 ? (
            similarServices.map((serviceItem) => (
              <FavoriteCard key={serviceItem._id} service={serviceItem} />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-600 text-lg">
              لا توجد خدمات مشابهة لهذه الخدمة
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServicesDetails);
