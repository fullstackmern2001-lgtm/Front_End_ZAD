import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/auth/authSlice";
import { getUserCart } from "../store/features/cart/cartThunk";
import { getMe } from "../store/features/user/userThunk";
import notify from "./useNotifaction";

const useHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  useEffect(() => {
    if (isAuth && user?.role === "user") dispatch(getUserCart());
  }, [dispatch, isAuth, user?.role]);

  useEffect(() => {
    if (isAuth) dispatch(getMe());
  }, [dispatch, isAuth]);

  useEffect(() => {
    if (!menuOpen || window.innerWidth >= 1280) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeMenusOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setUserOpen(false);
      }
    };
    const closeMenusOnDesktopResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("keydown", closeMenusOnEscape);
    window.addEventListener("resize", closeMenusOnDesktopResize);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeMenusOnEscape);
      window.removeEventListener("resize", closeMenusOnDesktopResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeUserMenuOnOutsideClick = (event) => {
      const insideDesktopMenu = userMenuRef.current?.contains(event.target);
      const insideMobileMenu = mobileUserMenuRef.current?.contains(event.target);
      if (!insideDesktopMenu && !insideMobileMenu) setUserOpen(false);
    };

    document.addEventListener("mousedown", closeUserMenuOnOutsideClick);
    return () =>
      document.removeEventListener("mousedown", closeUserMenuOnOutsideClick);
  }, []);

  const closeUserMenu = useCallback(() => setUserOpen(false), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeMenus = useCallback(() => {
    setUserOpen(false);
    setMenuOpen(false);
  }, []);
  const toggleUserMenu = useCallback(
    () => setUserOpen((current) => !current),
    [],
  );
  const toggleMenu = useCallback(
    () => setMenuOpen((current) => !current),
    [],
  );
  const logOut = useCallback(() => {
    dispatch(logout());
    closeUserMenu();
    notify("تم تسجيل الخروج", "success");
    navigate("/login");
  }, [closeUserMenu, dispatch, navigate]);

  const userRole = user?.role?.toLowerCase();
  const cartCount =
    cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return {
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
  };
};

export default useHeader;
