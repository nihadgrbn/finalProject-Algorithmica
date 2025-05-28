import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../layout/Header.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  function validate() {
    if (!name) return "Name cannot be empty";
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
      navigate("/login");
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, name: true }))}
              required
            />
          </label>
          {touched.name && !name && (
            <span style={{ color: "#d84315" }}>Name cannot be empty</span>
          )}
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
            <span style={{ color: "#d84315" }}>Email cannot be empty</span>
          )}
          {touched.email && email && !/\S+@\S+\.\S+/.test(email) && (
            <span style={{ color: "#d84315" }}>Invalid email format</span>
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
            <span style={{ color: "#d84315" }}>Password cannot be empty</span>
          )}
          {touched.password && password && password.length < 6 && (
            <span style={{ color: "#d84315" }}>Password must be at least 6 characters long</span>
          )}
          {error && <div style={{ color: "#d84315", marginTop: 6 }}>{error}</div>}
          <button type="submit" className={styles.submitBtn}>Register</button>
        </form>
        <div className={styles.formFooter}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff9800", fontWeight: 600 }}>Log In</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
