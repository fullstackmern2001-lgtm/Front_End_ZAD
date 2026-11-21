import { useEffect } from "react";

const useModalCloseOnEscape = (onClose) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
};

export default useModalCloseOnEscape;
