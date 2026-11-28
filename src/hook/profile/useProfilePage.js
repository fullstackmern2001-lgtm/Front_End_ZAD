import { useState } from "react";
import useGetUserProfile from "./useGetUserProfile";

const useProfilePage = () => {
  const { user, isLoading } = useGetUserProfile();
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const avatarPlaceholder = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "?";

  return {
    user,
    isLoading,
    editOpen,
    passwordOpen,
    avatarPlaceholder,
    openEdit: () => setEditOpen(true),
    closeEdit: () => setEditOpen(false),
    openPassword: () => setPasswordOpen(true),
    closePassword: () => setPasswordOpen(false),
  };
};

export default useProfilePage;
