import React from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import LogoImg from "../../../assets/logo.jpeg";
import useHeader from "../../../hook/useHeader";
const Header = () => {
  const {
    isAuth,
    user,
    userRole,
    cartCount,
    menuOpen,
    userOpen,
    userMenuRef,
    mobileUserMenuRef,
    toggleUserMenu,
    toggleMenu,
    closeUserMenu,
    closeMenu,
    closeMenus,
    logOut,
  } = useHeader();

  return (
    <nav className="site-header fixed top-0 left-0 w-full z-50 bg-white border-b border-green-200 shadow-sm">
      <div className="site-header__inner max-w-7xl !mx-auto !px-4 md:!px-6 lg:!px-8 !py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="site-brand !text-2xl flex items-center gap-3 !font-extrabold tracking-wide text-green-900 hover:!text-green-700 transition"
        >
          <img
            src={LogoImg}
            alt="logo"
            width={60}
            height={60}
            className="!rounded-3xl"
          />
          <h4> شركة زاد الخير لحفر الآبار</h4>
        </Link>

        {/* Desktop Menu */}
        <div className="site-nav hidden xl:flex items-center gap-8">
          <NavLink to="/">الرئيسية</NavLink>
          <NavLink to="/services">خدماتنا</NavLink>
          <NavLink to="/media">المركز الإعلامي</NavLink>
          <NavLink to="/about">عن الشركة</NavLink>
          <NavLink to="/contact">اتصل بنا</NavLink>

          {/* Cart */}
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-6 h-6 !text-green-900 group-hover:!text-green-700 group-hover:scale-110 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 !bg-green-700 !text-white !text-xs w-5 h-5 !rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth / User Dropdown */}
          {!isAuth ? (
            <Link
              to="/login"
              className="!rounded-full !bg-green-900 !px-5 !py-2 !font-medium !text-white !shadow-sm transition hover:!bg-green-700 hover:scale-105"
            >
              تسجيل الدخول
            </Link>
          ) : (
            <div ref={userMenuRef} className="relative">
              <button
                onClick={toggleUserMenu}
                aria-label="قائمة المستخدم"
                aria-expanded={userOpen}
                className="h-11 w-11 overflow-hidden !rounded-full !border-2 !border-green-800 !bg-green-100 shadow-md transition hover:scale-105"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName || "صورة المستخدم"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaCircleUser className="!mx-auto !text-3xl !text-green-800" />
                )}
              </button>

              {userOpen && (
                <div className="user-dropdown absolute !py-5 left-0 !mt-3 w-64 overflow-hidden !rounded-2xl border !border-green-100 !bg-white !text-right !shadow-xl animate-slideDown">
                  <div className="border-b !border-green-100 !bg-green-50 !px-4 !py-3">
                    <p className="font-semibold !text-green-900">
                      {user?.firstName || "المستخدم"}
                    </p>
                    <p className="truncate !text-xs !text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                  {userRole === "user" && (
                    <DropdownLink
                      to="/dashpord/profile"
                      onClick={closeUserMenu}
                    >
                      👤 لوحه التحكم
                    </DropdownLink>
                  )}
                  {userRole === "admin" && (
                    <>
                      <DropdownLink
                        to="/admin/services"
                        onClick={closeUserMenu}
                      >
                        🛠 لوحة تحكم الأدمن
                      </DropdownLink>
                      <DropdownLink
                        to="/dashpord/profile"
                        onClick={closeUserMenu}
                      >
                        👤 الملف الشخصي
                      </DropdownLink>
                    </>
                  )}
                  <button
                    onClick={logOut}
                    className="w-full !py-3 !text-red-600 hover:!bg-red-50 flex items-center justify-center"
                  >
                    🚪 تسجيل خروج
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="mobile-menu flex xl:hidden items-center gap-4 !text-black">
          {isAuth ? (
            <div ref={mobileUserMenuRef} className="relative">
              <button
                onClick={toggleUserMenu}
                aria-label="قائمة المستخدم"
                aria-expanded={userOpen}
                className="h-10 w-10 overflow-hidden !rounded-full !border-2 !border-green-800 !bg-green-100"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName || "صورة المستخدم"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaCircleUser className="!mx-auto !text-2xl !text-green-800" />
                )}
              </button>
              {userOpen && (
                <div className="user-dropdown absolute left-0 top-12 z-50 w-52 overflow-hidden !rounded-2xl !border !border-green-100 !bg-white !text-right !shadow-xl">
                  <DropdownLink
                    to={
                      userRole === "admin"
                        ? "/admin/services"
                        : "/dashpord/profile"
                    }
                    onClick={closeMenus}
                  >
                    {userRole === "admin"
                      ? "🛠 لوحة تحكم الأدمن"
                      : "👤 لوحة التحكم"}
                  </DropdownLink>
                  {userRole === "admin" && (
                    <DropdownLink
                      to="/dashpord/profile"
                      onClick={closeMenus}
                    >
                      👤 الملف الشخصي
                    </DropdownLink>
                  )}
                  <button
                    onClick={logOut}
                    className="w-full !px-4 !py-3 !text-right !text-red-600 hover:!bg-red-50"
                  >
                    🚪 تسجيل خروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="!text-green-900">
              <User size={28} />
            </Link>
          )}
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
            aria-controls="site-mobile-menu"
            className="hover:!text-green-800 transition"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="site-mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`mobile-links xl:hidden ${
          menuOpen ? "mobile-links--open" : "mobile-links--closed"
        } !border-b !border-green-200`}
      >
        <div className="flex flex-col !px-6 !py-6 gap-5 !text-lg">
          <MobileLink to="/" closeMenu={closeMenu}>
            الصفحه الرئيسيه
          </MobileLink>
          <MobileLink to="/services" closeMenu={closeMenu}>
            الخدمات
          </MobileLink>
          <MobileLink to="/media" closeMenu={closeMenu}>
            المركز الإعلامي
          </MobileLink>
          <MobileLink to="/about" closeMenu={closeMenu}>
            عن الشركة
          </MobileLink>
          <MobileLink to="/contact" closeMenu={closeMenu}>
            اتصل بنا
          </MobileLink>
          <MobileLink to="/cart" closeMenu={closeMenu}>
            السله
          </MobileLink>

          {!isAuth ? (
            <MobileLink to="/login" closeMenu={closeMenu}>
              تسجيل الدخول
            </MobileLink>
          ) : (
            <>
              {user?.role === "user" && (
                <MobileLink to="/dashpord/profile" closeMenu={closeMenu}>
                  لوحه التحكم
                </MobileLink>
              )}
              {user?.role === "admin" && (
                <>
                  <MobileLink to="/dashpord/profile" closeMenu={closeMenu}>
                    لوحه تحكم المستخدم
                  </MobileLink>
                  <MobileLink to="/admin/services" closeMenu={closeMenu}>
                    لوحه تحكم الادمن
                  </MobileLink>
                </>
              )}
              <div className="flex items-center justify-center">
                <button onClick={logOut} className="text-left !text-red-600">
                  تسجيل خروج
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Header);

/* Helpers */
const NavLink = ({ to, children }) => (
  <RouterNavLink
    to={to}
    end={to === "/"}
    className={({ isActive }) =>
      `!text-black !font-medium transition relative !border-b-2 !pb-1 ${
        isActive
          ? "!border-green-700 !text-green-700"
          : "border-transparent hover:!border-green-700 hover:!text-green-700"
      }`
    }
  >
    {children}
  </RouterNavLink>
);

const DropdownLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block !px-4 !py-3 hover:!bg-green-50 hover:!text-green-700 transition"
  >
    {children}
  </Link>
);

const MobileLink = ({ to, children, closeMenu }) => (
  <RouterNavLink
    to={to}
    end={to === "/"}
    onClick={closeMenu}
    className={({ isActive }) =>
      `text-black transition ${
        isActive
          ? "!border-r-4 !border-green-700 !pr-3 !font-bold !text-green-700"
          : "hover:!text-green-700"
      }`
    }
  >
    {children}
  </RouterNavLink>
);
