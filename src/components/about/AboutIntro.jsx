import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import aboutImage from "../../assets/Projects02/img01.jpg";

const socials = [
  {
    label: "Instagram",
    icon: FaInstagram,
    className: "bg-[#e1306c] hover:bg-[#c72b5f]",
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    className: "bg-[#1877f2] hover:bg-[#145fbe]",
  },
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    className: "bg-[#25d366] hover:bg-[#1da851]",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    className: "bg-sky-700 hover:bg-sky-800",
  },
];

const AboutIntro = () => (
  <section className="!px-5 !py-16 md:!py-24" dir="rtl">
    <div className="!mx-auto !grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
      <img
        src={aboutImage}
        alt="مشاريع زاد الخير"
        className="h-[360px] w-full rounded-3xl object-cover shadow-xl md:h-[430px]"
      />
      <div className="text-right">
        <span className="font-bold text-green-700">تعرف علينا</span>
        <h2 className="!mt-3 text-3xl font-extrabold text-green-900 md:text-4xl">
          من نحن
        </h2>
        <p className="!mt-5 text-lg font-bold leading-9 text-green-700">
          نؤمن أن الخير مسؤولية مشتركة تبدأ من الإنسان وتصل إلى المجتمع.
        </p>
        <p className="!mt-4 leading-8 text-gray-600">
          زاد الخير مؤسسة تعمل على تقديم المبادرات الإنسانية والتنموية، وتساند
          المجتمعات من خلال مشاريع نوعية وشراكات فاعلة تضع الإنسان واحتياجاته في
          المقدمة.
        </p>
        <div className="!mt-7 flex flex-wrap gap-3">
          {socials.map(({ label, icon: Icon, className }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:-translate-y-1 ${className}`}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutIntro;
