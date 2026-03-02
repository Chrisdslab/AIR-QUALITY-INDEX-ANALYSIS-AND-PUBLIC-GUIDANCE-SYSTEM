import React, { useState } from "react";
import axios from "axios";
import "../styles/global.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/users/login", form);

      if (res.data.success) {
        alert("Login successful!");

        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = "/dashboard"; // redirect
      } else {
        setError(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Server error. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    alert("Logged out");
    window.location.reload();
  };

  return (
    <div className="card login-card">
      <h2>Login</h2>

      {/* If logged in, show logout button */}
      {user && (
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      )}

      {/* If NOT logged in, show login form */}
      {!user && (
        <>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input"
          />

          {error && <p className="error">{error}</p>}

          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
}
