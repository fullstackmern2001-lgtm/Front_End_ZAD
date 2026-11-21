import React from "react";
import { LoaderCircle } from "lucide-react";
import Modal from "../Modal";
import PasswordStrengthMeter from "../../auth/PasswordStrengthMeter";
import useAccountForm from "../../../hook/account/useAccountForm";

const AccountFormModal = ({ account, loading, onSave, onClose }) => {
  const { form, handleChange, handleSubmit, handleClose } = useAccountForm(
    account,
    loading,
    onSave,
    onClose,
  );

  return (
    <Modal onClose={handleClose}>
      <h2 className="!mb-5 text-xl !font-bold text-[#174b5a]">
        {account ? "تعديل بيانات الحساب" : "إضافة حساب جديد"}
      </h2>
      <form onSubmit={handleSubmit} className="!space-y-4" dir="rtl">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="!space-y-2">
            <span className="block !font-semibold">الاسم الأول</span>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required
              className="w-full !rounded-xl border !p-3"
            />
          </label>
          <label className="!space-y-2">
            <span className="block !font-semibold">اسم العائلة</span>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required
              className="w-full !rounded-xl border !p-3"
            />
          </label>
        </div>
        <label className="!space-y-2">
          <span className="block !font-semibold">البريد الإلكتروني</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            maxLength={254}
            required
            dir="ltr"
            className="w-full !rounded-xl border !p-3 text-left"
          />
        </label>
        {account && (
          <label className="!space-y-2">
            <span className="block !font-semibold">صلاحية الحساب</span>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full !rounded-xl border !p-3"
            >
              <option value="user">مستخدم</option>
              <option value="admin">أدمن</option>
            </select>
          </label>
        )}
        {!account && (
          <>
            <label className="!space-y-2">
              <span className="block !font-semibold">كلمة المرور</span>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                minLength={10}
                maxLength={128}
                autoComplete="new-password"
                required
                className="w-full !rounded-xl border !p-3"
              />
            </label>
            <PasswordStrengthMeter password={form.password} />
            <label className="!space-y-2">
              <span className="block !font-semibold">تأكيد كلمة المرور</span>
              <input
                name="passwordConfirm"
                type="password"
                value={form.passwordConfirm}
                onChange={handleChange}
                minLength={10}
                maxLength={128}
                autoComplete="new-password"
                required
                className="w-full !rounded-xl border !p-3"
              />
            </label>
          </>
        )}
        <div className="flex justify-end gap-3 !pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl border !px-5 !py-2 disabled:opacity-60"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#174b5a] !px-5 !py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
                جاري الحفظ...
              </>
            ) : account ? (
              "حفظ التعديلات"
            ) : (
              "إضافة الحساب"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default React.memo(AccountFormModal);
