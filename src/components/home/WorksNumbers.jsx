import { FaMosque, FaWater, FaBookOpen, FaHandsHelping } from "react-icons/fa";

const statistics = [
  {
    id: 1,
    title: "المساجد التي تم بناؤها",
    number: "25+",
    icon: FaMosque,
  },
  {
    id: 2,
    title: "الآبار التي تم حفرها",
    number: "40+",
    icon: FaWater,
  },
  {
    id: 3,
    title: "المصاحف التي تم توزيعها",
    number: "5000+",
    icon: FaBookOpen,
  },
  {
    id: 4,
    title: "المشاريع الخيرية المنفذة",
    number: "100+",
    icon: FaHandsHelping,
  },
];

const WorksNumbers = () => {
  return (
    <section dir="rtl" className="w-full bg-white !py-16 md:!py-20">
      {/* Intro */}
      <div className="relative !mx-auto !mb-14 max-w-7xl overflow-hidden !rounded-[30px] bg-gradient-to-l from-[#174b5a] via-[#287c91] to-[#47752d] !px-6 !py-12 text-center shadow-lg md:!px-12 md:!py-16">
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-20 h-52 w-52 !rounded-full border-[25px] border-white/10" />
        <div className="absolute -bottom-24 -left-12 h-64 w-64 !rounded-full border-[30px] border-white/10" />

        <div className="relative z-10 !mx-auto max-w-3xl">
          <span className="!mb-4 inline-block rounded-full border border-white/40 bg-white/20 !px-5 !py-2 text-sm font-semibold text-white">
            أثرنا وإنجازاتنا
          </span>

          <h2 className="!mb-5 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            أعمالنا بالأرقام
          </h2>

          <p className="!mx-auto max-w-2xl text-base leading-8 text-white/95 md:text-lg">
            أرقام تحكي قصة عطاء وإنجاز، وتعكس جهودنا في تنفيذ المشاريع الخيرية
            والتنموية، لنصنع معًا أثرًا طيبًا يصل إلى أكبر عدد ممكن من
            المستفيدين.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="!mx-auto grid max-w-7xl grid-cols-1 gap-6 !px-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="group flex flex-col items-center !rounded-3xl border border-[#ddf1f2] bg-[#ffffff] !px-5 !py-9 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="!mb-6 flex h-20 w-20 items-center justify-center !rounded-2xl bg-[#ddf1f2] text-[#287c91] transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 group-hover:bg-green-700 group-hover:text-white">
                <Icon className="text-4xl" />
              </div>

              {/* Title */}
              <h3 className="!mb-5 min-h-[48px] text-lg font-bold leading-7 text-green-800">
                {item.title}
              </h3>

              {/* Number */}
              <div className="!mt-auto border-t border-[#ddf1f2] pt-5">
                <span className="text-4xl font-extrabold text-[#287c91] md:text-5xl">
                  {item.number}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorksNumbers;
