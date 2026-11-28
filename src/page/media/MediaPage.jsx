import React from "react";
import MediaGrid from "../../components/media/MediaGrid";
import MediaHero from "../../components/media/MediaHero";
import useNews from "../../hook/news/useNews";
import {
  NewsCardSkeleton,
  SkeletonList,
} from "../../components/utils/ContentSkeletons";
import { LoaderCircle } from "lucide-react";

const MediaPage = () => {
  const { news, isLoading, error, reload } = useNews();

  return (
    <main className="!mt-20">
      <MediaHero />
      {isLoading ? (
        <>
          <p className="flex items-center justify-center gap-2 bg-green-50 py-4 text-green-800" role="status">
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            جاري تحميل الأخبار...
          </p>
          <div className="grid gap-7 bg-green-50 px-5 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-3">
            <SkeletonList count={6} Card={NewsCardSkeleton} />
          </div>
        </>
      ) : error ? (
        <div className="bg-green-50 py-16 text-center text-red-600" role="alert">
          <p>{error}</p>
          <button type="button" onClick={reload} className="mt-3 rounded-lg border border-red-300 px-4 py-2">
            إعادة المحاولة
          </button>
        </div>
      ) : news.length === 0 ? (
        <p className="bg-green-50 py-16 text-center text-gray-600">
          لا توجد أخبار حاليًا.
        </p>
      ) : (
        <MediaGrid articles={news} />
      )}
    </main>
  );
};

export default React.memo(MediaPage);
