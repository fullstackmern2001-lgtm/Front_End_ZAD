import React from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import useForgotPasswordPage from "../../hook/auth/useForgotPasswordPage";

const ForgotPasswordPage = () => {
  const {
    email,
    code,
    codeRequested,
    isLoading,
    handleEmailChange,
    handleCodeChange,
    handleRequestCode,
    handleVerifyCode,
  } = useForgotPasswordPage();

  return (
    <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center !p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 !rounded-4">
              <div className="card-body auth-form !p-4 !p-md-5">
                <h3 className="text-center !mb-3 fw-semibold !text-green-900">
                  {codeRequested ? "التحقق من الرمز" : "نسيت كلمة المرور؟"}
                </h3>
                <p className="text-center !mb-4 !text-muted">
                  {codeRequested
                    ? "أدخل رمز التحقق المرسل إلى بريدك الإلكتروني للانتقال إلى تعيين كلمة مرور جديدة."
                    : "أدخل بريدك الإلكتروني وسنرسل لك رمزًا لاستعادة كلمة المرور."}
                </p>

                {!codeRequested ? (
                  <form onSubmit={handleRequestCode}>
                    <div className="input-group !mb-3">
                      <span className="input-group-text !bg-white">
                        <FaEnvelope className="!text-muted" />
                      </span>
                      <input
                        required
                        maxLength={254}
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="form-control"
                        placeholder="البريد الإلكتروني"
                        dir="ltr"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn auth-submit w-100 !py-2"
                    >
                      {isLoading ? "جارٍ الإرسال..." : "إرسال رمز الاستعادة"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyCode}>
                    <div className="input-group !mb-3">
                      <span className="input-group-text !bg-white">
                        <FaKey className="!text-muted" />
                      </span>
                      <input
                        required
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={code}
                        onChange={handleCodeChange}
                        className="form-control"
                        placeholder="رمز التحقق المكوّن من 6 أرقام"
                        dir="ltr"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn auth-submit w-100 !py-2"
                    >
                      {isLoading ? "جارٍ التحقق..." : "التحقق من الرمز"}
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={handleRequestCode}
                      className="btn btn-link w-100 !mt-2"
                    >
                      إرسال رمز جديد
                    </button>
                  </form>
                )}

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

export default React.memo(ForgotPasswordPage);
