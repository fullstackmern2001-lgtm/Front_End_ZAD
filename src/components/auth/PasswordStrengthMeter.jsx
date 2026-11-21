import React from "react";
import { getPasswordStrength } from "../../utils/passwordStrength";

const strengthDetails = {
  weak: {
    label: "ضعيفة",
    color: "bg-red-500",
    textColor: "text-red-700",
    width: "w-1/3",
  },
  medium: {
    label: "متوسطة",
    color: "bg-yellow-400",
    textColor: "text-yellow-700",
    width: "w-2/3",
  },
  strong: {
    label: "قوية",
    color: "bg-green-600",
    textColor: "text-green-700",
    width: "w-full",
  },
};

const PasswordStrengthMeter = ({ password }) => {
  const strength = getPasswordStrength(password);
  const details = strengthDetails[strength];

  return (
    <div className="!mt-2" aria-live="polite">
      <div
        className="h-2 overflow-hidden rounded-full bg-gray-200"
        role="meter"
        aria-label="قوة كلمة المرور"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={strength === "strong" ? 3 : strength === "medium" ? 2 : 1}
        aria-valuetext={details.label}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${details.color} ${details.width}`}
        />
      </div>
      <p className={`!mt-1 text-sm font-semibold ${details.textColor}`}>
        قوة كلمة المرور: {details.label}
      </p>
      <p className="!mt-1 text-xs text-gray-600">
        استخدم 10 أحرف على الأقل، مع أحرف وأرقام ورمز خاص مثل ! أو @ أو #.
      </p>
    </div>
  );
};

export default React.memo(PasswordStrengthMeter);
