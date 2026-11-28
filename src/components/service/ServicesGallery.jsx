import React from "react";
const ServicesGallery = ({ service }) => {
  return (
    <div className="card shadow-sm border-0">
      <img src={service?.image} className="img-fluid rounded" alt={service?.name || "الخدمة"} />
    </div>
  );
};

export default React.memo(ServicesGallery);
