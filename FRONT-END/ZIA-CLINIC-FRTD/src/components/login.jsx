import React from "react";
import "../index.css";

const Login = () => {
  return (
    <div className="login-shell">
      <div className="login-panel">
        <h1 className="logo">REGISTERATION</h1>
        <p className="subtitle">Secure access, simplified</p>

        <form className="login-form">
          <div className="field">
            <input type="text" required />
            <label>Full Name</label>
          </div>

          <div className="field">
            <input type="tel" required />
            <label>Phone Number</label>
          </div>

          <button className="cta">Continue</button>

          <span className="footnote">
            By continuing, you agree to our terms & privacy policy
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
