import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useRegister from "../../hook/useRegisterHook";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const RegisterForm = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    isLoading,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  } = useRegister();
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* First & Last Name */}
      <div className="row g-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text !bg-white">
              <FaUser className="text-muted" />
            </span>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="form-control"
              placeholder="First Name"
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaUser className="text-muted" />
            </span>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="form-control"
              placeholder="Last Name"
            />
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="input-group !mt-3">
        <span className="input-group-text !bg-white">
          <FaEnvelope className="text-muted" />
        </span>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          placeholder="Email Address"
        />
      </div>

      {/* Password */}
      <div className="input-group !mt-3">
        <span className="input-group-text bg-white">
          <FaLock className="text-muted" />
        </span>
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          minLength={10}
          maxLength={128}
          autoComplete="new-password"
          className="form-control"
          placeholder="Password"
        />
        <span
          className="input-group-text bg-white"
          style={{ cursor: "pointer" }}
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaEyeSlash className="text-muted" />
          ) : (
            <FaEye className="text-muted" />
          )}
        </span>
      </div>
      <PasswordStrengthMeter password={formData.password} />

      {/* Confirm Password */}
      <div className="input-group !mt-3">
        <span className="input-group-text bg-white">
          <FaLock className="text-muted" />
        </span>
        <input
          name="passwordConfirm"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.passwordConfirm}
          onChange={handleChange}
          minLength={10}
          maxLength={128}
          autoComplete="new-password"
          className="form-control"
          placeholder="Confirm Password"
        />
        <span
          className="input-group-text bg-white"
          style={{ cursor: "pointer" }}
          onClick={toggleConfirmPasswordVisibility}
        >
          {showConfirmPassword ? (
            <FaEyeSlash className="text-muted" />
          ) : (
            <FaEye className="text-muted" />
          )}
        </span>
      </div>

      {/* Button + Loading */}
      <button
        type="submit"
        disabled={isLoading}
        className="btn auth-submit w-100 !mt-4 d-flex justify-content-center align-items-center gap-2"
      >
        {isLoading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {isLoading ? "تسجيل حساب..." : "تسجيل حساب"}
      </button>

      <p className="text-center text-muted small !mt-4">
        لديك حساب بالفعل؟{" "}
        <Link to="/login" className="!fw-semibold !text-green-700">
          تسجيل الدخول
        </Link>
      </p>
    </form>
  );
};

export default React.memo(RegisterForm);
