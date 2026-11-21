import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/features/auth/authThunks";
import notify from "./useNotifaction";
import { useNavigate } from "react-router-dom";

const useLoginHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      notify("Email and password are required", "error");
      return;
    }
    dispatch(loginUser(formData))
      .unwrap()
      .then((response) => {
        notify(`${response.message}🎉`, "success");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        notify(
          typeof error === "string"
            ? error
            : error?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          "error",
        );
      });
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useLoginHook;
