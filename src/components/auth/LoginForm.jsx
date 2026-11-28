import React from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useLogin from "../../hook/useLoginHook";

const LoginForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <div className="card-body auth-form !p-4 !p-md-5">
      <h3 className="text-center !mb-4 fw-semibold !text-green-900">
        اهلا بعودتك
      </h3>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="input-group !mb-3">
          <span className="input-group-text !bg-white">
            <FaEnvelope className="!text-muted" />
          </span>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Email Address"
          />
        </div>

        {/* Password */}
        <div className="input-group !mb-2">
          <span className="input-group-text !bg-white">
            <FaLock className="text-muted" />
          </span>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Password"
          />
          <span
            className="input-group-text !bg-white"
            style={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <FaEyeSlash className="!text-muted" />
            ) : (
              <FaEye className="!text-muted" />
            )}
          </span>
        </div>

        {/* Forgot password */}
        <div className="text-end !mb-3">
          <Link
            to="/forgot-password"
            className="small !text-muted cursor-pointer text-decoration-none"
          >
            نسيت كلمه السر؟
          </Link>
        </div>

        {/* Button + Loading */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn auth-submit w-100 !py-2 d-flex justify-content-center align-items-center gap-2"
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
            ></span>
          )}
          {isLoading ? "تسجيل الدخول..." : "تسجيل الدخول"}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center !text-muted small !mt-4 !mb-0">
        ليس لديك حساب?{" "}
        <Link to="/register">
          <span className="fw-semibold text-green-700 cursor-pointer">
            تسجيل حساب جديد
          </span>
        </Link>
      </p>
    </div>
  );
};

export default React.memo(LoginForm);
