import { NavLink } from "react-router-dom";
import {
  Package,
  Layers,
  HeartHandshake,
  Newspaper,
  Images,
  Star,
  Tag,
  Users,
} from "lucide-react";

const Sidebar = () => {
  const baseStyle =
    "flex items-center gap-3 !px-4 !py-3 !rounded-xl font-medium transition-all duration-300";
  const activeStyle = "!bg-[#174b5a] !text-white shadow-md scale-[1.02]";
  const inactiveStyle =
    "!text-[#287c91] hover:!bg-[#f5f8f7] hover:!text-[#174b5a]";

  return (
    <div className="!rounded-2xl border !border-[#ddf1f2] !bg-white !p-4 shadow-sm">
      <h3 className="font-bold text-lg !mb-4 !text-[#174b5a]">لوحه التحكم</h3>
      <nav className="!space-y-2">
        <NavLink
          to="services"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Layers size={18} />
          الخدمات وإضافة خدمة
        </NavLink>
        <NavLink
          to="categories"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Tag size={18} />
          التصنيفات
        </NavLink>

        <NavLink
          to="orders"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Package size={18} />
          الاوردرات
        </NavLink>

        <NavLink
          to="sliders"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <HeartHandshake size={18} />
          السلايدر
        </NavLink>
        <NavLink
          to="news"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Newspaper size={18} />
          الأخبار
        </NavLink>
        <NavLink
          to="proofs"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Images size={18} />
          التوثيقات
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Star size={18} />
          التقييمات
        </NavLink>
        <NavLink
          to="accounts"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          <Users size={18} />
          الحسابات
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
