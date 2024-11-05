import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import LogoutButton from '../navegacion/LogoutButton';
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import NotificacionesBell from '../notificaciones/NotificacionesBell';
import { useSolicitudes } from '../../services/SolicitudesProvider';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userType = localStorage.getItem('userType');
  const { listarSolicitudes, solicitudes = [] } = useSolicitudes() || {};
  const [notificacionesPendientes, setNotificacionesPendientes] = useState(0);

  useEffect(() => {
    if (listarSolicitudes) {
      listarSolicitudes();
    }
    const interval = setInterval(() => {
      if (listarSolicitudes) {
        listarSolicitudes();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [listarSolicitudes]);

  useEffect(() => {
    const pendientes = solicitudes.filter(solicitud => solicitud.estado === 'en_curso');
    setNotificacionesPendientes(pendientes.length);
  }, [solicitudes]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="inset-x-0 top-0 h-16 bg-white md:px-8 sm:px-8 max-sm:px-8 z-50">
      <nav className="flex items-center justify-between lg:px-8 h-full" aria-label="Global">
        <div className="flex lg:flex-1 items-center">
          <div className="flex justify-center items-center ml-3 font-bold text-2xl text-green-600 tracking-wide">
            Domicilios
          </div>
        </div>

        <div className="flex gap-6 items-center">
          {/* Menú de navegación */}
          <ul className="hidden sm:flex  space-x-4">
            <Link to="/Home" className="text-gray-800 hover:text-green-600">Home</Link>
            {userType === 'domiciliario' && (
              <>
                <Link to="/novedades" className="text-gray-800 hover:text-green-600">Registrar novedad</Link>
                <Link to="/NotificacionesDom" className="text-gray-800 hover:text-green-600">Domicilios</Link>
              </>
            )}
            {userType === 'administrador' && (
              <Link to="/PanelDeControl" className="text-gray-800 hover:text-green-600">Panel De Control</Link>
            )}
          </ul>
          {(userType === 'domiciliario' ||userType === 'administrador' )&& (
            <div className="sm:hidden">
              <button onClick={toggleMenu} className="text-3xl">
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
              {isMenuOpen && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg p-4">
                  <Link to="/Home" className="block text-gray-800 hover:text-green-600 mb-2">Home</Link>
                  <Link to="/novedades" className="block text-gray-800 hover:text-green-600 mb-2">Registrar novedad</Link>
                  <Link to="/NotificacionesDom" className="block text-gray-800 hover:text-green-600 mb-2">Domicilios</Link>
                  {userType === 'administrador' && (
                  <Link to="/PanelDeControl" className="text-gray-800 hover:text-green-600">Panel De Control</Link>
                )}
                </div>
              )}
            </div>
          )}
          {userType === 'domiciliario' && (
            <>
              <button className="relative" onClick={toggleNotifications}>
                <FaBell className="text-3xl cursor-pointer" />
                {notificacionesPendientes > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificacionesPendientes}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-lg">
                  <NotificacionesBell />
                </div>
              )}
            </>
          )}

          <LogoutButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
