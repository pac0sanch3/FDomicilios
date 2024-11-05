import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';

export const ActividadForm = ({ actividad, onSubmit, onClose }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: actividad?.id_usuario || '',
    descripcion: actividad?.descripcion || '',
    fecha_hora: actividad?.fecha_hora ? new Date(actividad.fecha_hora).toISOString().slice(0, 16) : ''
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {actividad ? 'Editar Actividad' : 'Registrar Actividad'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Usuario</label>
              <select
                name="id_usuario"
                value={formData.id_usuario}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Seleccione un usuario</option>
                {users.map(user => (
                  <option key={user.id_usuario} value={user.id_usuario}>
                    {user.nombre} ({user.id_usuario})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha y Hora</label>
              <input
                type="datetime-local"
                name="fecha_hora"
                value={formData.fecha_hora}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {actividad ? 'Actualizar' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};