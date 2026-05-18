import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <AuthShell
      eyebrow="Agri Advisory"
      title="Create your farm account"
      subtitle="Register once and keep your crop and location data in one place."
      asideTitle="Sign up"
      footer={
        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      }
    >
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="auth-field apple-liquid-glass">
          <span className="auth-field__icon" aria-hidden="true">
            ◇
          </span>
          <input
            className="auth-field__input"
            autoComplete="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleRegister();
              }
            }}
          />
        </div>

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
                handleRegister();
              }
            }}
          />
        </div>

        <div className="auth-field apple-liquid-glass">
          <span className="auth-field__icon" aria-hidden="true">
            •
          </span>
          <input
            className="auth-field__input"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleRegister();
              }
            }}
          />
        </div>

        <button type="submit" className="auth-button apple-liquid-glass">
          Register
        </button>
      </form>
    </AuthShell>
  );
}

export default Register;
