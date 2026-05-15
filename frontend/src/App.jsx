import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  // show a brief loader on route changes (rendering pages)
  function RouteLoader() {
    const location = useLocation();
    useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const { showLoader, hideLoader } = await import("./utils/loader");
          showLoader();
          setTimeout(() => {
            if (mounted) hideLoader();
          }, 250);
        } catch (e) {
          // ignore
        }
      })();

      return () => {
        mounted = false;
      };
    }, [location]);

    return null;
  }

  return (
    <BrowserRouter>
      <RouteLoader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
