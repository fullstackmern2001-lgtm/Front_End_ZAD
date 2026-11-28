import React from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import PasswordStrengthMeter from "../../components/auth/PasswordStrengthMeter";
import useResetPasswordPage from "../../hook/auth/useResetPasswordPage";

const ResetPasswordPage = () => {
  const {
    resetToken,
    password,
    passwordConfirm,
    isLoading,
    handlePasswordChange,
    handlePasswordConfirmChange,
    handleSubmit,
  } = useResetPasswordPage();

  if (!resetToken) return null;

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center !p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 !rounded-4">
              <div className="card-body auth-form !p-4 !p-md-5">
                <h3 className="text-center !mb-3 fw-semibold !text-green-900">
                  تعيين كلمة مرور جديدة
                </h3>
                <p className="text-center !mb-4 !text-muted">
                  أدخل كلمة المرور الجديدة وأكدها لإكمال استعادة حسابك.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="input-group !mb-3">
                    <span className="input-group-text !bg-white">
                      <FaLock className="!text-muted" />
                    </span>
                    <input
                      required
                      minLength={10}
                      maxLength={128}
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={handlePasswordChange}
                      className="form-control"
                      placeholder="كلمة المرور الجديدة"
                    />
                  </div>
                  <PasswordStrengthMeter password={password} />
                  <div className="input-group !mb-3">
                    <span className="input-group-text !bg-white">
                      <FaLock className="!text-muted" />
                    </span>
                    <input
                      required
                      minLength={10}
                      maxLength={128}
                      type="password"
                      autoComplete="new-password"
                      value={passwordConfirm}
                      onChange={handlePasswordConfirmChange}
                      className="form-control"
                      placeholder="تأكيد كلمة المرور"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn auth-submit w-100 !py-2"
                  >
                    {isLoading ? "جارٍ تغيير كلمة المرور..." : "تغيير كلمة المرور"}
                  </button>
                </form>

                <p className="text-center !text-muted small !mt-4 !mb-0">
                  <Link to="/login" className="fw-semibold text-green-700">
                    العودة إلى تسجيل الدخول
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ResetPasswordPage);
