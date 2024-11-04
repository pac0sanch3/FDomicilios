import { Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio"; // Componente de inicio de sesión
import Home from "./pages/Home"; // Componente de la página de inicio
import PanelDeControl from "./pages/PaneldeControl";
import Registro from "./pages/Registrar_usuario";
import ProtectedRoute from "./components/proteccion/ProtectedRoute"; // Importa el componente de protección de rutas
import ProtectedAdminRoute from "./components/proteccion/ProtectedAdminRoute";


import { NotificacionesDom } from "./pages/NotificacionesDom";
import UserProfile from './components/usuario/usuario_administrar';
import RecuperarPassword from './components/usuario/recuperar_contra';

import RegistroNegocio from './pages/Registrar_negocio';
import Solicitud from './pages/Solicitud'
import Novedades from "./pages/Novedades";
function App() {
  return (
    <Routes>
      {/* Ruta pública: Inicio de sesión */}
      <Route path="/" element={<Inicio />} />
      <Route path="/NotificacionesDom" element={<NotificacionesDom />} />
      {/* Rutas protegidas */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/solicitud"
        element={
          <ProtectedRoute>
            <Solicitud />
          </ProtectedRoute>
        }
      />
      <Route
        path="/novedades"
        element={
          <ProtectedRoute>
            <Novedades />
          </ProtectedRoute>
        }
      />

      {/* Otras rutas protegidas */}
      <Route
        path="/Paneldecontrol"
        element={
          <ProtectedAdminRoute>
            <ProtectedRoute>
              <PanelDeControl />
            </ProtectedRoute>
          </ProtectedAdminRoute>
        }
      />

      {/* Ruta de registro pública */}
      <Route path="/registro" element={<Registro />} />

      <Route path="/profile" element={<UserProfile />} />
      <Route path="/recuperar-password" element={<RecuperarPassword />} />
      <Route path="/negocio" element={<RegistroNegocio />} />
    </Routes>
  );
}

export default App;