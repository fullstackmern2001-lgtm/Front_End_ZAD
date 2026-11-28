import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../store/features/user/userThunk";

const useProtectedRoute = (allowedRoles = []) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getMe());
      setInitialized(true);
    };
    fetchUser();
  }, [dispatch]);

  return {
    user,
    isLoading: !initialized || loading,
    isAuthorized:
      !allowedRoles.length || allowedRoles.includes(user?.role),
  };
};

export default useProtectedRoute;
