import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
import { resetPassword } from "../../store/features/auth/authService";
import {
  isStrongPassword,
  passwordStrengthMessage,
} from "../../utils/passwordStrength";

const useResetPasswordPage = () => {
  const navigate = useNavigate();
  const [resetToken] = useState(() =>
    sessionStorage.getItem("passwordResetToken"),
  );
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  useEffect(() => {
    if (!resetToken) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate, resetToken]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      notify("كلمتا المرور غير متطابقتين", "error");
      return;
    }
    if (!isStrongPassword(password)) {
      notify(passwordStrengthMessage, "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({
        resetToken,
        password,
        passwordConfirm,
      });
      sessionStorage.removeItem("passwordResetToken");
      notify(response.data.message, "success");
      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        "تعذر تغيير كلمة المرور. حاول مرة أخرى.";

      if (error.response?.status === 400) {
        sessionStorage.removeItem("passwordResetToken");
        navigate("/forgot-password", { replace: true });
      }
      notify(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetToken,
    password,
    passwordConfirm,
    isLoading,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
  };
};

export default useResetPasswordPage;
