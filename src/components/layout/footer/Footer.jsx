import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaMosque,
  FaWater,
  FaBookOpen,
  FaGraduationCap,
  FaUtensils,
  FaHandHoldingHeart,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const services = [
    {
      title: "حفر الآبار السطحية والارتوازية",
      link: "/services",
      icon: <FaWater />,
    },
    {
      title: "بناء المساجد وترميمها",
      link: "/services",
      icon: <FaMosque />,
    },
    {
      title: "بناء الفصول الدراسية",
      link: "/services",
      icon: <FaGraduationCap />,
    },
    {
      title: "تنفيذ العقائق والأضاحي",
      link: "/services",
      icon: <FaUtensils />,
    },
    {
      title: "توزيع السلال الغذائية",
      link: "/services",
      icon: <FaHandHoldingHeart />,
    },
    {
      title: "توزيع المصحف الشريف",
      link: "/services",
      icon: <FaBookOpen />,
    },
  ];

  const quickLinks = [
    {
      title: "الأسئلة الشائعة",
      link: "/about",
    },
    {
      title: "سياسة الخصوصية",
      link: "/about",
    },
    {
      title: "لماذا نحن؟",
      link: "/about",
    },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      link: "https://www.facebook.com/share/152J3h8t2mC/",
      label: "Facebook",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/zadal5her?vrfl=ZzlzYnY1eTQ2amxt",
      label: "Instagram",
    },
    {
      icon: <FaYoutube />,
      link: "#",
      label: "Youtube",
    },
    {
      icon: <FaLinkedinIn />,
      link: "Zadal5hir@gmail.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer
      dir="rtl"
      className="site-footer relative overflow-hidden bg-[#174b5a] text-white"
    >
      {/* Decorative top line */}
      <div className="site-footer__accent h-1.5 w-full" />

      {/* Main Footer */}
      <div className="!mx-auto grid max-w-7xl grid-cols-1 gap-12 !px-6 !py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:!py-20">
        {/* About Company */}
        <div>
          <h3 className="!mb-6 text-2xl font-extrabold text-[#86efac]">
            زاد الخير
          </h3>

          <p className="!mb-7 text-sm leading-8 text-green-300">
            جهة إنسانية تعمل على تنفيذ مشاريع الإغاثة والخدمات الخيرية، وتدعم
            المجتمعات المحتاجة من خلال التبرعات والمبادرات التنموية.
          </p>

          <h4 className="!mb-4 text-sm font-bold text-white">
            تابعونا على مواقع التواصل
          </h4>

          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`footer-social flex h-10 w-10 items-center justify-center !rounded-xl border border-white/15 text-lg text-white transition-all duration-300 hover:-translate-y-1`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="relative !mb-7 inline-block text-xl font-bold text-white">
            خدماتنا
            <span className="absolute -bottom-3 right-0 h-1 w-12 !rounded-full bg-[#15803d]" />
          </h3>

          <ul className="!space-y-4">
            {services.map((service) => (
              <li key={service.title}>
                <Link
                  to={service.link}
                  className="group flex items-center gap-3 text-sm text-green-300 transition-colors duration-300 hover:text-[#86efac]"
                >
                  <span className="text-[#15803d] transition-transform duration-300 group-hover:scale-125">
                    {service.icon}
                  </span>
                  <span>{service.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="relative !mb-7 inline-block text-xl font-bold text-white">
            روابط مختصرة
            <span className="absolute -bottom-3 right-0 h-1 w-12 !rounded-full bg-[#15803d]" />
          </h3>

          <ul className="!space-y-5">
            {quickLinks.map((item) => (
              <li key={item.title}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-green-300 transition-colors duration-300 hover:text-[#86efac]"
                >
                  <FaArrowLeft className="text-xs text-[#15803d] transition-transform duration-300 group-hover:-translate-x-1" />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          <div className="!mt-8 !rounded-2xl border border-[#15803d]/20 bg-white/5 !p-4">
            <p className="text-sm leading-7 text-green-300">
              نسعى دائمًا لصناعة أثر إيجابي من خلال مشاريعنا الخيرية والتنموية.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="relative !mb-7 inline-block text-xl font-bold text-white">
            تواصل معنا
            <span className="absolute -bottom-3 right-0 h-1 w-12 rounded-full bg-[#15803d]" />
          </h3>

          <div className="!space-y-6">
            <a
              href="https://wa.me/962790013732"
              className="group flex items-start gap-4 text-green-300 transition-colors hover:text-[#86efac]"
              dir="ltr"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center !rounded-xl bg-[#15803d]/15 text-lg text-[#86efac] transition-colors group-hover:bg-[#15803d] group-hover:text-white">
                <FaPhoneAlt />
              </span>
              <span className="!pt-2 text-sm">+962790013732</span>
            </a>

            <a
              href="Zadal5hir@gmail.com"
              className="group flex items-start gap-4 text-green-300 transition-colors hover:text-[#86efac]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#15803d]/15 text-lg text-[#86efac] transition-colors group-hover:bg-[#15803d] group-hover:text-white">
                <FaEnvelope />
              </span>
              <span className="break-all !pt-2 text-sm" dir="ltr">
                Zadal5hir@gmail.com
              </span>
            </a>

            <div className="flex items-start gap-4 text-green-300">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center !rounded-xl bg-[#15803d]/15 text-lg text-[#86efac]">
                <FaMapMarkerAlt />
              </span>
              <span className="!pt-1 text-sm leading-7">
                الاردن
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="site-footer__bottom border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:flex-row">
          <p className="text-sm !text-gray-500">
            © {new Date().getFullYear()} شركة زاد الخير. جميع الحقوق محفوظة.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500">
            صُنع بكل
            <FaHeart className="text-[#d9a64e]" />
            لخدمة الخير والعطاء
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
