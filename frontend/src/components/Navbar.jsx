import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div style={{ marginBottom: "20px" }}>

      <button onClick={logout}>
        Logout
      </button>

    </div>
  );
}

export default Navbar;