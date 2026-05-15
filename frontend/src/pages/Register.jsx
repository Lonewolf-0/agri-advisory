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
      asideSubtitle="Need an account?"
      footer={
        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <div className="auth-field">
          <span className="auth-field__icon" aria-hidden="true">
            ◇
          </span>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          Register
        </button>
      </form>
    </AuthShell>
  );
}

export default Register;
