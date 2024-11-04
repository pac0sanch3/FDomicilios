import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const userType = localStorage.getItem('userType');

  if (userType !== 'administrador') {
    // Si el usuario no es administrador, redirigir a la página de inicio
    return <Navigate to="/Home" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
