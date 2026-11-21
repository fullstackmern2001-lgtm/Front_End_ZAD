import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../store/features/user/userThunk";
import { resetPasswordSuccess } from "../../store/features/user/userSlice";
import notify from "../useNotifaction";
import {
  isStrongPassword,
  passwordStrengthMessage,
} from "../../utils/passwordStrength";

const useEditeUserPassowrd = (onClose) => {
  const dispatch = useDispatch();
  const { isLoading, error, passwordSuccess, user } = useSelector(
    (state) => state.user,
  );

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!user) return;
    if (!isStrongPassword(form.newPassword)) {
      notify(passwordStrengthMessage, "error");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      notify("كلمتا المرور غير متطابقتين", "error");
      return;
    }

    dispatch(updateUserPassword({ id: user._id, data: form }));
  };

  useEffect(() => {
    if (passwordSuccess) {
      dispatch(resetPasswordSuccess());
      notify("تم تغيير كلمه السر بنجاح", "success");
      onClose();
    }
  }, [passwordSuccess, dispatch, onClose]);

  return { form, handleChange, error, handleSubmit, isLoading };
};

export default useEditeUserPassowrd;
