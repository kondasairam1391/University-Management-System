import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import "../styles/login.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const register = async () => {
    await registerUser(form);

    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
        >
          <option value="USER">USER</option>

          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="login-btn" onClick={register}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
