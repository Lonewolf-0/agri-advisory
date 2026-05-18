import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import api from "../services/api";
function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // show loader while logging in and navigating
      const { showLoader } = await import("../utils/loader");
      showLoader();

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <AuthShell
      eyebrow="Agri Advisory"
      title="Let’s get started with weather-driven farm guidance."
      subtitle=""
      asideTitle="Sign in"
      footer={
        <p className="auth-card__footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      }
    >
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="auth-field apple-liquid-glass">
          <span className="auth-field__icon" aria-hidden="true">
            @
          </span>
          <input
            className="auth-field__input"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
        </div>

        <div className="auth-field apple-liquid-glass">
          <span className="auth-field__icon" aria-hidden="true">
            *
          </span>
          <input
            className="auth-field__input"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            }}
          />
        </div>

        <button type="submit" className="auth-button apple-liquid-glass">
          Login
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
