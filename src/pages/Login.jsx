import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../layout/Header.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function validate() {
    if (!email) return "Email cannot be empty";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!password) return "Password cannot be empty";
    if (password.length < 6) return "Password must be at least 6 characters long";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (!err) {
      navigate("/");
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeBtn}
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, email: true }))}
              required
            />
          </label>
          {touched.email && !email && (
            <span className={styles.inputError}>Email cannot be empty</span>
          )}
          {touched.email && email && !/\S+@\S+\.\S+/.test(email) && (
            <span className={styles.inputError}>Invalid email format</span>
          )}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, password: true }))}
              required
            />
          </label>
          {touched.password && !password && (
            <span className={styles.inputError}>Password cannot be empty</span>
          )}
          {touched.password && password && password.length < 6 && (
            <span className={styles.inputError}>Password must be at least 6 characters long</span>
          )}
          {error && <div className={styles.inputError} style={{ marginTop: 6 }}>{error}</div>}
          <button type="submit" className={styles.submitBtn}>Log In</button>
        </form>
        <div className={styles.formFooter}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ff9800", fontWeight: 600 }}>Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
