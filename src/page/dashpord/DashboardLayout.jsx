import React from "react";
import SidebarLinks from "../../components/dashpord/Sidebar";
import { Outlet } from "react-router-dom";
import useDashboardLayout from "../../hook/useDashboardLayout";

const DashboardLayout = () => {
  const { open, openMenu, closeMenu } = useDashboardLayout();

  return (
    <div className="container !mx-auto !py-8 !mt-[70px]">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="bg-white !rounded-2xl shadow !p-4 sticky top-24">
            <h3 className="!font-bold !text-lg !mb-4">ملفي الشخصي</h3>
            <SidebarLinks />
          </div>
        </aside>

        {/* Content */}
        <main className="col-span-12 lg:col-span-8">
          {/* Mobile Button */}
          <button
            onClick={openMenu}
            className="lg:hidden !mb-4 w-full !py-3 !rounded-xl bg-green-900 text-white font-medium"
          >
            ☰ ملفي الشخصي
          </button>

          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-green-900/40 z-40"
            onClick={closeMenu}
          />

          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl !p-6 animate-slideUp">
            <div className="flex justify-between items-center !mb-4">
              <h3 className="!font-bold !text-lg">ملفي الشخصي</h3>
              <button
                onClick={closeMenu}
                className="text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <SidebarLinks onClick={closeMenu} />
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(DashboardLayout);
