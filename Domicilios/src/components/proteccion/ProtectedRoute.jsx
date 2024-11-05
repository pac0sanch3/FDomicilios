// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);

  if (!token) {
    // Si no hay token, redirigir al inicio de sesión
    return <Navigate to="/" />;
  }

  // Si hay token, permitir el acceso
  return children;
};

export default ProtectedRoute;
