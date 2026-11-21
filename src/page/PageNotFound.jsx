import { Link } from "react-router-dom";

export default function NotFoundLuxury() {
  return (
    <div className="min-h-screen bg-[#f0fdf4] !p-0 !m-0 flex items-center justify-center text-green-800 font-sans">
      <div className="w-full max-w-xl !px-4 sm:!px-6 lg:!px-8 text-center">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-200 !p-8 sm:!p-12">
          <span className="block text-sm tracking-widest text-gray-500">
            ERROR 404
          </span>

          <h1 className="!mt-4 sm:!mt-6 text-4xl sm:text-6xl font-light tracking-tight">
            Page Not Found
          </h1>

          <p className="!mt-4 sm:!mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
            The page you’re looking for doesn’t exist or has been moved. Let’s
            get you back to something familiar.
          </p>

          <div className="!mt-6 sm:!mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="border border-green-800 !px-6 sm:!px-8 !py-2 sm:!py-3 text-sm tracking-wide hover:bg-green-700 hover:text-white transition"
            >
              Back Home
            </Link>

            <Link
              to="/shop"
              className="text-sm sm:text-base tracking-wide text-gray-600 hover:text-green-800 transition"
            >
              Visit Shop
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <p className="!mt-6 sm:!mt-10 text-xs sm:text-sm !text-gray-500">
          © 2026 MyStore · Designed with simplicity
        </p>
      </div>
    </div>
  );
}
