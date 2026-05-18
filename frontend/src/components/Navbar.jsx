import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="navbar-shell">
      <button className="apple-liquid-glass navbar__button" onClick={logout}>
        <svg className="icon" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"
            fill="currentColor"
          />
        </svg>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
