import { useNavigate } from "react-router-dom";
import { FaRightFromBracket } from "react-icons/fa6";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="navbar-shell">
      <button className="apple-liquid-glass navbar__button" onClick={logout}>
        <FaRightFromBracket className="icon" aria-hidden />
        Logout
      </button>
    </div>
  );
}

export default Navbar;
