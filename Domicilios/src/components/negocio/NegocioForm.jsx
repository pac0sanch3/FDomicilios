import React, { useState, useEffect } from 'react';
import { NegocioService } from '../../services/negocioservice';
import { userService } from '../../services/userService';

export const NegocioForm = ({ negocio, onSubmit, onClose }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: negocio?.id_usuario || '',
    nombre_negocio: negocio?.nombre_negocio || '',
    direccion: negocio?.direccion || '',
    imagen_banner: null
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen_banner: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (negocio) {
        await NegocioService.updateNegocio(negocio.id_negocio, formData);
      } else {
        await NegocioService.createNegocio(formData);
      }
      onSubmit(formData);
    } catch (error) {
      console.error('Error al guardar el negocio:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{negocio ? 'Editar Negocio' : 'Registrar Negocio'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Nombre del negocio</label>
            <input
              type="text"
              name="nombre_negocio"
              value={formData.nombre_negocio}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Imagen del banner</label>
            <input
              type="file"
              name="imagen_banner"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-lg"
            />
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
              {negocio ? 'Actualizar' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
