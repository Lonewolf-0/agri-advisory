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
        Logout
      </button>
    </div>
  );
}

export default Navbar;
