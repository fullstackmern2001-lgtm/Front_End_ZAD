import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";
import useMobileNav from "../../hook/useMobileNav";

const MobileNav = () => {
  const { open, openMenu, closeMenu } = useMobileNav();

  return (
    <>
      {/* زر فوق */}
      <div className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-[min(90%,320px)] !rounded-2xl !bg-[#174b5a] !shadow-lg z-50 !p-3 !mt-[100px] flex items-center justify-center !text-white !text-[35px]">
        <button onClick={openMenu} aria-label="فتح قائمة الإدارة">
          <Menu />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 !bg-[#174b5a]/40 z-40"
          onClick={closeMenu}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 w-full !bg-[#f5f8f7] !rounded-t-2xl z-50 transform transition-transform duration-300 
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="!p-4">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
