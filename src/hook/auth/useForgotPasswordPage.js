import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../useNotifaction";
import {
  requestPasswordReset,
  verifyPasswordResetCode,
} from "../../store/features/auth/authService";

const useForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeRequested, setCodeRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestCode = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await requestPasswordReset({ email });
      notify(response.data.message, "success");
      setCodeRequested(true);
      setCode("");
    } catch (error) {
      notify(
        error.response?.data?.message ||
          "تعذر إرسال رمز الاستعادة. حاول مرة أخرى لاحقًا.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await verifyPasswordResetCode({ email, code });
      notify(response.data.message, "success");
      sessionStorage.setItem("passwordResetToken", response.data.resetToken);
      navigate("/reset-password");
    } catch (error) {
      notify(
        error.response?.data?.message ||
          error.response?.data?.errors?.[0]?.msg ||
          "تعذر التحقق من الرمز. تحقق منه وحاول مرة أخرى.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value.replace(/\D/g, ""));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return {
    email,
    code,
    codeRequested,
    isLoading,
    handleEmailChange,
    handleCodeChange,
    handleRequestCode,
    handleVerifyCode,
  };
};

export default useForgotPasswordPage;
