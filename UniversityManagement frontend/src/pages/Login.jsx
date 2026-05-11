import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../services/authService";

import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // LOGIN
  const login = async () => {
    if (!form.username || !form.password) {
      alert("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      const response = await loginUser(form);

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE ROLE
      localStorage.setItem("role", response.data.role);

      // SAVE USERNAME
      localStorage.setItem("username", response.data.username);

      // REDIRECT
      window.location.href = "/";
    } catch (error) {
      console.log(error);

      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {/* USERNAME */}
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={changeHandler}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={changeHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        />

        {/* BUTTON */}
        <button className="login-btn" onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER LINK */}
        <p style={{ marginTop: "15px" }}>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
