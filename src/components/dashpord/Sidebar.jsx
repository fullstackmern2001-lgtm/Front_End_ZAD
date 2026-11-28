import { NavLink } from "react-router-dom";

const SidebarLinks = ({ onClick }) => {
  const base =
    "flex items-center gap-3 !px-4 !py-3 !rounded-xl font-medium transition-all";

  const active = "bg-green-900 text-white shadow-md";

  const inactive = "text-green-700 hover:bg-green-100";

  return (
    <nav className="!space-y-2">
      {[
        { to: "profile", label: "👤 الملف الشخصي" },
        { to: "orders", label: "📦 الاوردر" },
        { to: "favorites", label: "❤️ المفضله" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onClick}
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default SidebarLinks;
