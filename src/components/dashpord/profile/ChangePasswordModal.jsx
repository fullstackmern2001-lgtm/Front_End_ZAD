import useEditeUserPassowrd from "../../../hook/profile/useEditeUserPassowrd";
import Modal from "../Modal";
import { Loader2 } from "lucide-react";
import React from "react";
import PasswordStrengthMeter from "../../auth/PasswordStrengthMeter";
const ChangePasswordModal = ({ onClose }) => {
  const { form, handleChange, error, handleSubmit, isLoading } =
    useEditeUserPassowrd(onClose);
  return (
    <Modal onClose={onClose}>
      <h3 className="font-bold text-xl !mb-4">تغيير كلمه السر</h3>

      <div className="!space-y-3">
        <input
          type="password"
          name="currentPassword"
          placeholder="كلمه السر القديمه"
          className="w-full border rounded-xl !px-4 !py-2"
          value={form.currentPassword}
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="كلمه السر الجديدة"
          minLength={10}
          maxLength={128}
          autoComplete="new-password"
          className="w-full border rounded-xl !px-4 !py-2"
          value={form.newPassword}
          onChange={handleChange}
        />
        <PasswordStrengthMeter password={form.newPassword} />
        <input
          type="password"
          name="confirmPassword"
          placeholder="تاكيد كلمه السر الجديدة"
          minLength={10}
          maxLength={128}
          autoComplete="new-password"
          className="w-full border rounded-xl !px-4 !py-2"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <div className="flex justify-end gap-3 !mt-6">
        <button onClick={onClose} className="!px-5 !py-2 rounded-full border">
          الغاء
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="!px-5 !py-2 rounded-full bg-green-900 text-white disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              تحميل...
            </>
          ) : (
            "تغيير كلمه السر"
          )}
        </button>
      </div>
    </Modal>
  );
};

export default React.memo(ChangePasswordModal);
