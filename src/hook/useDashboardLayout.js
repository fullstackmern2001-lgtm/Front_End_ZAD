import { useState } from "react";

const useDashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);
  const closeMenu = () => setOpen(false);

  return { open, openMenu, closeMenu };
};

export default useDashboardLayout;
