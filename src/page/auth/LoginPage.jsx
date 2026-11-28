import React from "react";

import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="auth-page min-vh-100 d-flex align-items-center justify-content-center !p-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0 !rounded-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
