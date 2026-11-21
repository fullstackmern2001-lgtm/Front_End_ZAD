import { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { Header, Footer } from "../components/layout";
import UnauthorizedPage from "../page/unauthorizedPage/UnauthorizedPage";

// صفحات Lazy Loading
const Home = lazy(() => import("../page/home/HomePage"));
const LoginPage = lazy(() => import("../page/auth/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("../page/auth/ForgotPasswordPage"),
);
const ResetPasswordPage = lazy(
  () => import("../page/auth/ResetPasswordPage"),
);
const RegisterPage = lazy(() => import("../page/auth/RegisterPage"));
const ServicesDetails = lazy(() => import("../page/services/ServicesDetails"));
const CartPage = lazy(() => import("../page/cart/CartPage"));
const CheckoutPage = lazy(() => import("../page/checkout/CheckoutPage"));
const MediaPage = lazy(() => import("../page/media/MediaPage"));
const AboutPage = lazy(() => import("../page/about/AboutPage"));
const ContactPage = lazy(() => import("../page/contact/ContactPage"));

// Dashpord User
const ProfilePage = lazy(() => import("../page/dashpord/ProfilePage"));
const OrdersPage = lazy(() => import("../page/dashpord/OrdersPage"));
const FavoritesPage = lazy(() => import("../page/dashpord/FavoritesPage"));
const DashboardLayout = lazy(() => import("../page/dashpord/DashboardLayout"));

// Admin Pages
const DashboardLayoutAdmin = lazy(() => import("../page/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("../page/admin/OrdersPage"));
const SliderAdminPage = lazy(() => import("../page/admin/SliderAdminPage"));
const ServicesPage = lazy(() => import("../page/services/ServicesPage"));
const AdminServicesPage = lazy(() => import("../page/admin/ServicesPage"));
const CategoriesPage = lazy(() => import("../page/admin/CategoriesPage"));
const NewsAdminPage = lazy(() => import("../page/admin/NewsAdminPage"));
const ProofsPage = lazy(() => import("../page/proofs/ProofsPage"));
const AdminProofsPage = lazy(() => import("../page/admin/ProofsPage"));
const AdminReviewsPage = lazy(() => import("../page/admin/ReviewsPage"));
const AccountsPage = lazy(() => import("../page/admin/AccountsPage"));

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

const RouterLayout = () => (
  <>
    <ScrollRestoration />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <RouterLayout />,
    children: [
  // Public Pages
  {
    path: "/",
    element: (
      <>
        <Header /> <Home /> <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header /> <LoginPage /> <Footer />
      </>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <>
        <Header /> <ForgotPasswordPage /> <Footer />
      </>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <>
        <Header /> <ResetPasswordPage /> <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header /> <RegisterPage /> <Footer />
      </>
    ),
  },
  {
    path: "/service/:id",
    element: (
      <>
        <Header /> <ServicesDetails /> <Footer />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header /> <CartPage /> <Footer />
      </>
    ),
  },
  {
    path: "/checkout",
    element: (
      <>
        <Header /> <CheckoutPage /> <Footer />
      </>
    ),
  },
  {
    path: "/services",
    element: (
      <>
        <Header /> <ServicesPage /> <Footer />
      </>
    ),
  },
  {
    path: "/media",
    element: (
      <>
        <Header /> <MediaPage /> <Footer />
      </>
    ),
  },
  {
    path: "/proofs",
    element: (
      <>
        <Header /> <ProofsPage /> <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Header /> <AboutPage /> <Footer />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Header /> <ContactPage /> <Footer />
      </>
    ),
  },
  // Dashpord User & Admin
  {
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
    children: [
      {
        path: "/dashpord",
        element: (
          <>
            <Header /> <DashboardLayout /> <Footer />
          </>
        ),
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "favorites", element: <FavoritesPage /> },
        ],
      },
    ],
  },

  // Admin Only
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: (
          <>
            <Header /> <DashboardLayoutAdmin /> <Footer />
          </>
        ),
        children: [
          { index: true, element: <Navigate to="services" replace /> },
          { path: "services", element: <AdminServicesPage /> },
          { path: "services/new", element: <AdminServicesPage /> },
          { path: "categories", element: <CategoriesPage /> },
          { path: "categories/new", element: <CategoriesPage /> },
          { path: "orders", element: <AdminOrders /> },
          { path: "slider", element: <Navigate to="/admin/sliders" replace /> },
          { path: "sliders", element: <SliderAdminPage /> },
          { path: "sliders/new", element: <SliderAdminPage /> },
          { path: "news", element: <NewsAdminPage /> },
          { path: "news/new", element: <NewsAdminPage /> },
          { path: "proofs", element: <AdminProofsPage /> },
          { path: "proofs/new", element: <AdminProofsPage /> },
          { path: "reviews", element: <AdminReviewsPage /> },
          { path: "accounts", element: <AccountsPage /> },
        ],
      },
    ],
  },

  // Unauthorized & fallback
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "*",
    element: <UnauthorizedPage />,
  },
    ],
  },
]);
