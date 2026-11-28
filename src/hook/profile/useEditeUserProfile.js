import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/features/user/userThunk";
import notify from "../useNotifaction";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

const useEditeUserProfile = (user, onClose) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [form, setForm] = useState({
    firstName: user?.firstName,
    email: user?.email,
    phone: user?.phone,
    avatar: user?.avatar,
  });

  useEffect(
    () => () => {
      if (form.avatar?.startsWith("blob:")) {
        URL.revokeObjectURL(form.avatar);
      }
    },
    [form.avatar],
  );

  // تغيير النصوص
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // تغيير الصورة + preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setForm((previous) => ({
      ...previous,
      avatar: preview,
      avatarFile: file,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    if (form.firstName !== user?.firstName) {
      formData.append("firstName", form.firstName);
    }
    if (form.email !== user?.email) {
      formData.append("email", form.email);
    }
    if (form.phone && form.phone !== user?.phone) {
      formData.append("phone", form.phone);
    }

    if (form.avatarFile) {
      formData.append("avatar", form.avatarFile);
    }

    if ([...formData.keys()].length === 0) {
      onClose();
      return;
    }

    try {
      await dispatch(
        updateUser({
          id: user._id,
          data: formData,
        }),
      ).unwrap();
      notify("تم تعديل الملف الشخصي", "success");
      onClose();
    } catch (error) {
      notify(getApiErrorMessage(error, "تعذر تعديل الملف الشخصي"), "error");
    }
  };
  return { form, handleSubmit, handleImageChange, handleChange, isLoading };
};

export default useEditeUserProfile;
