import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/utils/Loading";
import useProtectedRoute from "../hook/useProtectedRoute";
const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isLoading, isAuthorized } = useProtectedRoute(allowedRoles);

  if (isLoading) return <Loading />;
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
