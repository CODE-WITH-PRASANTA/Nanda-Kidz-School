import React, { useState } from "react";
import "./Loginform.css";

const Loginform = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() && password.trim()) {
      if (rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        sessionStorage.setItem("isAuthenticated", "true");
      }

      setIsSuccess(true);

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      }, 2200);
    }
  };

  return (
    <div className="Loginform-container">
      <div className="Loginform-wrapper">
        {/* Left Side Info Panel */}
        <div className="Loginform-left">
          <div className="Loginform-brand-header">
            <div className="Loginform-logo-icon">★</div>
            <h1 className="Loginform-brand-title">Nanda Kidz School</h1>
            <p className="Loginform-brand-subtitle">
              ♥ Nurturing Young Minds, Shaping Bright Futures ♥
            </p>
          </div>

          <div className="Loginform-info-list">
            <div className="Loginform-info-item">
              <div className="Loginform-info-icon">🏫</div>
              <div className="Loginform-info-text">
                <h4>About Our School</h4>
                <p>
                  Nanda Kidz School is a loving and safe environment where children learn, grow and shine every day.
                </p>
              </div>
            </div>

            <div className="Loginform-info-item">
              <div className="Loginform-info-icon">👥</div>
              <div className="Loginform-info-text">
                <h4>Our Focus</h4>
                <p>
                  We focus on holistic development through quality education, fun activities and values.
                </p>
              </div>
            </div>

            <div className="Loginform-info-item">
              <div className="Loginform-info-icon">📖</div>
              <div className="Loginform-info-text">
                <h4>What We Offer</h4>
                <p>
                  Playgroup to Primary Education, Experienced Teachers, Smart Classes, Activity Based Learning and more.
                </p>
              </div>
            </div>

            <div className="Loginform-info-item">
              <div className="Loginform-info-icon">🛡️</div>
              <div className="Loginform-info-text">
                <h4>Our Promise</h4>
                <p>
                  We are committed to providing the best foundation for your child's future.
                </p>
              </div>
            </div>
          </div>

          <div className="Loginform-illustration">
            🏫 NANDA KIDZ SCHOOL CAMPUS
          </div>
        </div>

        {/* Right Side Form Panel */}
        <div className="Loginform-right">
          <div className="Loginform-header">
            <div className="Loginform-lock-badge">🔒</div>
            <h2 className="Loginform-title">Welcome Back!</h2>
            <p className="Loginform-subtext">Login to access your account</p>
          </div>

          <form className="Loginform-form" onSubmit={handleSubmit}>
            <div className="Loginform-field-group">
              <label className="Loginform-label">Username</label>
              <div className="Loginform-input-wrapper">
                <span className="Loginform-input-icon">👤</span>
                <input
                  type="text"
                  className="Loginform-input"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="Loginform-field-group">
              <label className="Loginform-label">Password</label>
              <div className="Loginform-input-wrapper">
                <span className="Loginform-input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="Loginform-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="Loginform-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className="Loginform-options">
              <label className="Loginform-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />{" "}
                Remember me
              </label>
              <a href="#forgot" className="Loginform-forgot">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="Loginform-submit-btn">
              Login
            </button>

            <div className="Loginform-divider">
              <span>OR</span>
            </div>

            <button type="button" className="Loginform-admin-btn">
              🛡️ Login as Admin
            </button>
          </form>
        </div>
      </div>

      {/* Full-Page 3D Animated Success Overlay */}
      {isSuccess && (
        <div className="Loginform-success-overlay">
          <div className="Loginform-success-card">
            <div className="Loginform-success-icon">✓</div>
            <h2 className="Loginform-success-title">Login Successful!</h2>
            <p className="Loginform-success-subtext">
              Welcome back! Redirecting to Dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loginform;