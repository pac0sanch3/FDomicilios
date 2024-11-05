import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';

export const DomiciliarioForm = ({ domiciliario, onSubmit, onClose }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: domiciliario?.id_usuario || '',
    licencia_vehiculo: domiciliario?.licencia_vehiculo || '',
    disponibilidad: domiciliario?.disponibilidad || 'disponible',
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id_usuario: parseInt(formData.id_usuario, 10),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {domiciliario ? 'Editar Domiciliario' : 'Registrar Domiciliario'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="id_usuario" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <select
              id="id_usuario"
              name="id_usuario"
              value={formData.id_usuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Seleccione un usuario</option>
              {users.map((user) => (
                <option key={user.id_usuario} value={user.id_usuario}>
                  {user.nombre} ({user.id_usuario})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="licencia_vehiculo" className="block text-sm font-medium text-gray-700 mb-1">
              Licencia de Vehículo
            </label>
            <input
              id="licencia_vehiculo"
              type="text"
              name="licencia_vehiculo"
              value={formData.licencia_vehiculo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {domiciliario ? 'Actualizar' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
