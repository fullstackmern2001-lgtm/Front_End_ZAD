import React from "react";
import EditProfileModal from "../../components/dashpord/profile/EditProfileModal";
import ChangePasswordModal from "../../components/dashpord/profile/ChangePasswordModal";
import useProfilePage from "../../hook/profile/useProfilePage";
import { ProfileSkeleton } from "../../components/utils/ContentSkeletons";

const ProfilePage = () => {
  const {
    user,
    isLoading,
    editOpen,
    passwordOpen,
    avatarPlaceholder,
    openEdit,
    closeEdit,
    openPassword,
    closePassword,
  } = useProfilePage();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProfileSkeleton />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow !p-6">
      <div className="flex items-center gap-4 !mb-6">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.firstName}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center text-2xl font-bold text-white">
            {avatarPlaceholder}
          </div>
        )}

        <div>
          <h3 className="font-bold text-lg">{user?.firstName}</h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-gray-600">{user?.phone}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={openEdit}
          className="!px-1 py-2 !rounded-[5px] !text-[13px] md:!px-5 lg:!px-5 lg:!py-2 lg:rounded-full border bg-green-900 text-white"
        >
          تعديل بياناتك
        </button>
        <button
          onClick={openPassword}
          className="!px-1 py-2 !rounded-[3px] !text-[13px] md:!px-5 lg:!px-5 lg:!py-2 lg:rounded-full border"
        >
          تفيير كلمه السر
        </button>
      </div>

      {editOpen && (
        <EditProfileModal
          user={user}
          onClose={closeEdit}
        />
      )}

      {passwordOpen && (
        <ChangePasswordModal onClose={closePassword} />
      )}
    </div>
  );
};

export default React.memo(ProfilePage);
