import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import MobileNav from "../../components/admin/MobileNav";
import React from "react";
const AdminDashboard = () => {
  return (
    <div className="container !mx-auto !mt-[100px] !px-4 !py-8 sm:!px-6">
      {/* ✅ موبايل ناف */}
      <MobileNav />

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar (Desktop فقط) */}
        <aside className="hidden lg:block lg:col-span-3">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="col-span-12 lg:col-span-9 !mt-20 lg:!mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default React.memo(AdminDashboard);
