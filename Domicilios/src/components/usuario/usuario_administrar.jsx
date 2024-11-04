import { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { Alert } from '../alert/Alert';
import { useNavigate } from 'react-router-dom';
import Layout from "../template/Layout";

const UserProfileContent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo_usuario: '',
  });
  const [passwordData, setPasswordData] = useState({
    contrasenaActual: '',
    nuevaContrasena: '',
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await userService.getUser(userId);
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      showAlert('Error al cargar datos del usuario', 'error');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await userService.updateUser(userId, userData);
      showAlert('Perfil actualizado exitosamente', 'success');

      localStorage.setItem('userName', userData.nombre);
      localStorage.setItem('userEmail', userData.correo);

      navigate('/Home');
    } catch (error) {
      showAlert(error.response?.data?.mensaje || 'Error al actualizar perfil', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      await userService.cambiarContrasena(userId, passwordData);
      showAlert('Contraseña actualizada exitosamente', 'success');
      setPasswordData({ contrasenaActual: '', nuevaContrasena: '' });
    } catch (error) {
      showAlert(error.response?.data?.mensaje || 'Error al cambiar contraseña', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Perfil</h2>
      
      {alert.show && <Alert {...alert} />}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={userData.nombre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            name="correo"
            value={userData.correo}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={userData.telefono}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
          <input
            type="text"
            value={userData.tipo_usuario}
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 cursor-not-allowed"
            disabled
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Actualizar Perfil
        </button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="space-y-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Cambiar Contraseña</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
          <input
            type="password"
            name="contrasenaActual"
            value={passwordData.contrasenaActual}
            onChange={handlePasswordChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <input
            type="password"
            name="nuevaContrasena"
            value={passwordData.nuevaContrasena}
            onChange={handlePasswordChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

const UserProfile = () => {
  return (
    <Layout>
      <UserProfileContent />
    </Layout>
  );
};

export default UserProfile;
