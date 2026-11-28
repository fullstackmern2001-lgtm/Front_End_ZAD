import { useState } from "react";
import notify from "../useNotifaction";
import {
  isStrongPassword,
  passwordStrengthMessage,
} from "../../utils/passwordStrength";

const useAccountForm = (account, loading, onSave, onClose) => {
  const [form, setForm] = useState({
    firstName: account?.firstName || "",
    lastName: account?.lastName || "",
    email: account?.email || "",
    role: account?.role || "user",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!account && !isStrongPassword(form.password)) {
      notify(passwordStrengthMessage, "error");
      return;
    }
    if (!account && form.password !== form.passwordConfirm) {
      notify("كلمتا المرور غير متطابقتين", "error");
      return;
    }
    onSave(form);
  };

  const handleClose = () => {
    if (!loading) onClose();
  };

  return { form, handleChange, handleSubmit, handleClose };
};

export default useAccountForm;
