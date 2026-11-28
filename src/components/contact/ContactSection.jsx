import React from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import contactImage from "../../assets/Projects02/img05.jpg";
import useContactSection from "../../hook/contact/useContactSection";

const ContactSection = () => {
  const { isSending, handleSubmit, socialLinks } = useContactSection();

  return (
  <section className="bg-green-50 !px-5 !py-16 md:!py-24" dir="rtl">
    <div className="mx-auto max-w-7xl">
      <img
        src={contactImage}
        alt="فريق يعمل على مشاريع الخير"
        loading="lazy"
        className="h-56 w-full !rounded-3xl object-cover shadow-lg md:h-80"
      />
      <div className="!mt-14 grid gap-10 !rounded-3xl bg-white !p-6 shadow-md md:grid-cols-[1.2fr_0.8fr] md:!p-10">
        <div>
          <span className="font-bold text-green-700">نحن نسمعك</span>
          <h2 className="!mt-3 text-3xl font-extrabold text-green-900">
            اترك رسالة لنا
          </h2>
          <form
            className="!mt-8 !space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <input
                required
                name="name"
                type="text"
                placeholder="الاسم"
                className="!rounded-xl border border-green-200 !px-4 !py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                className="!rounded-xl border border-green-200 !px-4 !py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                dir="ltr"
              />
            </div>
            <input
              required
              name="phone"
              type="tel"
              placeholder="رقم الهاتف"
              className="w-full !rounded-xl border border-green-200 !px-4 !py-3 text-right outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              dir="ltr"
            />
            <textarea
              required
              name="message"
              rows="5"
              placeholder="الرسالة"
              className="w-full resize-none !rounded-xl border border-green-200 !px-4 !py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
            <button
              type="submit"
              disabled={isSending}
              className="!rounded-xl bg-green-900 !px-8 !py-3 font-bold text-white transition hover:bg-green-700"
            >
              {isSending ? "جارٍ الإرسال..." : "إرسال الرسالة"}
            </button>
          </form>
        </div>

        <aside className="!rounded-2xl bg-green-50 !p-6 text-right">
          <h3 className="text-2xl font-extrabold text-green-900">
            معلومات التواصل
          </h3>
          <div className="!mt-7 !space-y-5">
            <a
              href="https://wa.me/962790013732"
              className="group flex items-center gap-4 text-gray-700 transition hover:text-green-700"
              dir="rtl"
            >
              <span className="flex h-11 w-11 items-center justify-center !rounded-xl bg-green-900 text-white">
                <FaPhoneAlt />
              </span>
              <span dir="ltr">+962790013732</span>
            </a>
            <a
              href="Zadal5hir@gmail.com"
              className="group flex items-center gap-4 text-gray-700 transition hover:text-green-700"
              dir="rtl"
            >
              <span className="flex h-11 w-11 items-center justify-center !rounded-xl bg-green-900 text-white">
                <FaEnvelope />
              </span>
              <span dir="ltr">Zadal5hir@gmail.com</span>
            </a>
            <div className="flex items-start gap-4 text-gray-700">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center !rounded-xl bg-green-900 text-white">
                <FaMapMarkerAlt />
              </span>
              <span className="leading-7">
                الاردن
                <br />
                نخدم المجتمعات أينما كانت
              </span>
            </div>
          </div>
          <div className="!mt-8 border-t !border-green-200 !pt-6">
            <p className="!font-bold !text-green-800">تابعونا على منصات التواصل</p>
            <div className="!mt-4 flex gap-3">
              {socialLinks.map(({ label, icon: Icon, href, className }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex h-10 w-10 items-center justify-center !rounded-full text-white transition hover:-translate-y-1 ${className}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
  );
};

export default ContactSection;
