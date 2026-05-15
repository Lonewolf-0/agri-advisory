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
      asideSubtitle="Need an account?"
      footer={
        <p className="auth-card__footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            @
          </span>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            •
          </span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </AuthShell>
  );
}

export default Login;
