import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "./useNotifaction";
import { registerUser } from "../store/features/auth/authThunks";
import {
  isStrongPassword,
  passwordStrengthMessage,
} from "../utils/passwordStrength";

const useRegisterHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((current) => !current);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      notify("Passwords do not match", "error");
      return;
    }
    if (!isStrongPassword(formData.password)) {
      notify(passwordStrengthMessage, "error");
      return;
    }

    setIsSubmitted(true); // 👈 مهم
    dispatch(registerUser(formData));
  };

  const getErrorMessage = (error) => {
    if (!error) return null;

    if (Array.isArray(error)) return error[0]?.msg;
    if (typeof error === "object") return error.message;
    return error;
  };

  useEffect(() => {
    const message = getErrorMessage(error);
    if (message) {
      notify(message, "error");
      setIsSubmitted(false); // فشل → نلغي
    }
  }, [error]);

  useEffect(() => {
    if (user && isSubmitted) {
      notify("Account created successfully 🎉", "success");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }
  }, [user, isSubmitted]);

  return {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};

export default useRegisterHook;
