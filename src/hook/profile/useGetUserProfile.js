import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../store/features/user/userThunk";

const useGetUserProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  return { user, isLoading };
};

export default useGetUserProfile;
