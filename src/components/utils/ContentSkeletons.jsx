import React from "react";

const SkeletonBlock = ({ className }) => (
  <div className={`animate-pulse rounded bg-green-200 ${className}`} />
);

export const ServiceCardSkeleton = () => (
  <article className="overflow-hidden !rounded-2xl bg-white shadow-sm">
    <SkeletonBlock className="h-52 w-full" />
    <div className="!space-y-3 !p-5">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="h-5 w-3/4" />
      <SkeletonBlock className="h-14 w-full" />
      <div className="flex items-center justify-between border-t border-green-100 !pt-4">
        <SkeletonBlock className="h-6 w-16" />
        <SkeletonBlock className="h-10 w-24 !rounded-xl" />
      </div>
      <SkeletonBlock className="!mx-auto h-3 w-36" />
    </div>
  </article>
);

export const NewsCardSkeleton = () => (
  <article className="overflow-hidden !rounded-2xl bg-white shadow-md">
    <SkeletonBlock className="h-56 w-full" />
    <div className="!space-y-3 !p-6">
      <SkeletonBlock className="h-4 w-28" />
      <SkeletonBlock className="h-6 w-4/5" />
      <SkeletonBlock className="h-10 w-full" />
      <SkeletonBlock className="h-5 w-28" />
    </div>
  </article>
);

export const NewsFeatureSkeleton = () => (
  <div className="!px-3 !py-5 md:!px-8">
    <div className="grid animate-pulse grid-cols-1 overflow-hidden !rounded-2xl bg-white md:grid-cols-2">
      <SkeletonBlock className="h-64 rounded-none sm:h-80 md:h-[390px]" />
      <div className="!space-y-5 !p-6 md:!p-8 lg:!p-10">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-10 w-4/5" />
        <SkeletonBlock className="h-24 w-full" />
        <SkeletonBlock className="h-5 w-28" />
      </div>
    </div>
  </div>
);

export const OrderSkeleton = () => (
  <article className="!space-y-4 !rounded-2xl bg-white !p-4 shadow">
    <div className="flex justify-between">
      <div className="!space-y-2">
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="h-4 w-24" />
      </div>
      <SkeletonBlock className="h-7 w-24 !rounded-full" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonBlock className="h-24 w-full" />
      <SkeletonBlock className="h-24 w-full" />
      <SkeletonBlock className="h-24 w-full" />
    </div>
    <SkeletonBlock className="h-6 w-32" />
  </article>
);

export const ProfileSkeleton = () => (
  <article className="!space-y-6 !rounded-2xl bg-white !p-6 shadow">
    <div className="flex items-center gap-4">
      <SkeletonBlock className="h-20 w-20 rounded-full" />
      <div className="!space-y-3">
        <SkeletonBlock className="h-5 w-32" />
        <SkeletonBlock className="h-4 w-48" />
        <SkeletonBlock className="h-4 w-32" />
      </div>
    </div>
    <div className="flex gap-3">
      <SkeletonBlock className="h-10 w-32 !rounded-full" />
      <SkeletonBlock className="h-10 w-32 !rounded-full" />
    </div>
  </article>
);

export const CartSkeleton = () => (
  <div className="!space-y-4">
    <div className="space-y-4 !rounded-2xl bg-white !p-4 shadow">
      <SkeletonBlock className="h-24 w-full" />
      <SkeletonBlock className="h-24 w-full" />
      <SkeletonBlock className="h-24 w-full" />
    </div>
    <SkeletonBlock className="h-56 w-full !rounded-2xl" />
  </div>
);

export const ReviewCardSkeleton = () => (
  <article className="!space-y-4 !rounded-2xl bg-white !p-5 shadow-md">
    <div className="flex items-center gap-3">
      <SkeletonBlock className="h-14 w-14 !rounded-full" />
      <div className="!space-y-2">
        <SkeletonBlock className="h-5 w-28" />
        <SkeletonBlock className="h-4 w-24" />
      </div>
    </div>
    <SkeletonBlock className="h-16 w-full" />
  </article>
);

export const SkeletonList = ({ count, Card }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <Card key={index} />
    ))}
  </>
);
