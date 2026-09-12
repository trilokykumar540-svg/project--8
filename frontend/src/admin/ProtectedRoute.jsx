import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    const currentTime =
      Math.floor(Date.now() / 1000);

    if (
      !payload.exp ||
      payload.exp < currentTime
    ) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");

      return (
        <Navigate
          to="/admin/login"
          replace
        />
      );
    }
  } catch (error) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;