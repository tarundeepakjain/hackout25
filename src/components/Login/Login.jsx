import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Community Mangrove Watch</h2>
        <p>
          Login to access the dashboard and start reporting mangrove incidents.
        </p>
        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
