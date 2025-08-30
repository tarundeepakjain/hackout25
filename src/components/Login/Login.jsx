import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up first.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>🌿</div>
        <h2>Community Mangrove Watch</h2>
        <p>Login to access the dashboard and report mangrove incidents.</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className={styles.signupLink}>
          <span>Don't have an account? </span>
          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </div>

        <div className={styles.forgotPassword}>
          <Link to="/forgot-password" className={styles.link}>
            Forgot your password?
          </Link>
        </div>

        <div className={styles.demoNote}>
          <p>💡 Demo: Use any email/password to login</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
