import { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import api from "../../store/baseUrl";
import notify from "../useNotifaction";

const socialLinks = [
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/zadal5her?vrfl=ZzlzYnY1eTQ2amxt",
    className: "bg-green-900 hover:bg-[#E4405F]",
  },
  {
    label: "Facebook",
    icon: FaFacebookF,
    href: "https://www.facebook.com/share/152J3h8t2mC/",
    className: "bg-green-900 hover:bg-[#1877F2]",
  },
  {
    label: "Twitter",
    icon: FaTwitter,
    href: "https://twitter.com/",
    className: "bg-green-900 hover:bg-[#1DA1F2]",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/",
    className: "bg-green-900 hover:bg-[#0A66C2]",
  },
];

const useContactSection = () => {
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await api.post("/contact", Object.fromEntries(formData.entries()));
      notify("تم إرسال رسالتك بنجاح", "success");
      form.reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        "تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.";
      notify(errorMessage, "error");
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, handleSubmit, socialLinks };
};

export default useContactSection;
