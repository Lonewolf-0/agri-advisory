import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      try {
        await api.get("/auth/me");

        setValid(true);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");

        setValid(false);
      } finally {
        setLoading(false);
      }
    }

    verifyToken();
  }, []);

  if (loading) return <div>Checking authentication...</div>;

  if (!valid) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
