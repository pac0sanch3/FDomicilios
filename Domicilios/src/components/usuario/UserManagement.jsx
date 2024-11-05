import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { UserForm } from './UserForm';
import { UserList } from './UserList';
import { Alert } from '../alert/Alert';
import { Button } from '@nextui-org/react';
import ActividadesManagement from '../actividades/ActividadesManagement';
import Graficas from "../graficas/Graficas";
import RolesManagement from './RolesManagement';
import SolicitudesManagement from '../solicitudes/SolicitudesManagement.jsx';
import DomiciliariosManagement from '../domiciliario/DomiciliariosManagement.jsx';
import NovedadesManagement from '../novedades/NovedadesManagement.jsx';
import { IoMenu } from 'react-icons/io5';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [currentView, setCurrentView] = useState('usuarios');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      showAlert('Error al cargar usuarios', 'error');
    }
  };

  const handleCreateOrUpdateUser = async (userData) => {
    try {
      if (selectedUser) {
        await userService.updateUser(selectedUser.id_usuario, userData);
        showAlert('Usuario actualizado exitosamente', 'success');
      } else {
        await userService.createUser(userData);
        showAlert('Usuario creado exitosamente', 'success');
      }
      loadUsers();
      setModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      showAlert(error.response?.data?.mensaje || 'Error al procesar la operación', 'error');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      try {
        await userService.deleteUser(userId);
        showAlert('Usuario eliminado exitosamente', 'success');
        loadUsers();
      } catch (error) {
        showAlert('Error al eliminar usuario', 'error');
      }
    }
  };

  const handleToggleActive = async (userId, currentStatus) => {
    try {
      await userService.updateUser(userId, {
        estado: currentStatus === 'activo' ? 'inactivo' : 'activo'
      });
      showAlert(`Usuario ${currentStatus === 'activo' ? 'desactivado' : 'activado'} exitosamente`, 'success');
      loadUsers();
    } catch (error) {
      showAlert('Error al cambiar estado del usuario', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const filteredUsers = users.filter(user => {
    if (!userTypeFilter) return true;
    return user.tipo_usuario === userTypeFilter;
  });

  return (
    <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>

      <Alert {...alert} />

      {/* Botón de menú hamburguesa para pantallas pequeñas */}
      <div className="block sm:hidden mb-4">
        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          color="primary"
          auto
        >
          <IoMenu size={24} />
        </Button>
      </div>

      {/* Menú en lista para pantallas pequeñas y en línea para pantallas grandes */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-6`}>
        <Button onClick={() => setCurrentView('usuarios')} color={currentView === 'usuarios' ? 'primary' : 'default'} auto>
          Usuarios
        </Button>
        <Button onClick={() => setCurrentView('roles')} color={currentView === 'roles' ? 'primary' : 'default'} auto>
          Incidentes
        </Button>
        <Button onClick={() => setCurrentView('solicitudes')} color={currentView === 'solicitudes' ? 'primary' : 'default'} auto>
          Solicitudes
        </Button>
        <Button onClick={() => setCurrentView('Novedades')} color={currentView === 'Novedades' ? 'primary' : 'default'} auto>
          Novedades
        </Button>
        <Button onClick={() => setCurrentView('Domicilio')} color={currentView === 'Domicilio' ? 'primary' : 'default'} auto>
          Domicilio
        </Button>
        <Button onClick={() => setCurrentView('actividades')} color={currentView === 'actividades' ? 'primary' : 'default'} auto>
          Actividades
        </Button>
        <Button onClick={() => setCurrentView('Graficas')} color={currentView === 'Graficas' ? 'primary' : 'default'} auto>
          Gráficas
        </Button>
      </div>

      {/* Renderizar el apartado correspondiente */}
      {currentView === 'usuarios' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-600 text-base font-medium mb-2">Filtrar por tipo de usuario</label>
            <select
              className="w-full p-2 border-2 border-blue-200 rounded-lg hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 text-gray-800"
              value={userTypeFilter}
              onChange={(e) => setUserTypeFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="administrador">Administrador</option>
              <option value="negocio">Negocio</option>
              <option value="particular">Particular</option>
              <option value="domiciliario">Domiciliario</option>
            </select>
          </div>

          <UserList
            users={filteredUsers}
            onEdit={user => {
              setSelectedUser(user);
              setModalOpen(true);
            }}
            onDelete={handleDeleteUser}
            onToggleActive={handleToggleActive}
          />

          <button
            className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
            onClick={() => {
              setSelectedUser(null);
              setModalOpen(true);
            }}
          >
            Crear Nuevo Usuario
          </button>
        </>
      )}

      {currentView === 'actividades' && <ActividadesManagement />}
      {currentView === 'Novedades' && <NovedadesManagement />}
      {currentView === 'solicitudes' && <SolicitudesManagement />}
      {currentView === 'Domicilio' && <DomiciliariosManagement />}
      {currentView === 'roles' && <RolesManagement />}

      {currentView === 'Graficas' && (
        <div className="w-full">
          <Graficas />
        </div>
      )}

      {modalOpen && (
        <UserForm
          user={selectedUser}
          onSubmit={handleCreateOrUpdateUser}
          onClose={() => {
            setModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
