export const getPasswordStrength = (password = "") => {
  const categories = [
    /\p{L}/u.test(password),
    /\p{N}/u.test(password),
    /[^\p{L}\p{N}\s]/u.test(password),
  ].filter(Boolean).length;
  const length = [...password].length;

  if (length >= 10 && categories === 3) return "strong";
  if (length >= 8 && categories >= 2) return "medium";
  return "weak";
};

export const isStrongPassword = (password) =>
  getPasswordStrength(password) === "strong";

export const passwordStrengthMessage =
  "استخدم 10 أحرف على الأقل مع أحرف وأرقام ورمز خاص.";
