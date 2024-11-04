import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';
import { domiciliariosService } from '../../services/domiciliarioServer';

export const SolicitudForm = ({ role, onSubmit, onClose }) => {
  const [users, setUsers] = useState([]);
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    id_cliente: '',
    id_domiciliario: '',
    direccion_recogida: '',
    direccion_entrega: '',
    estado: 'pendiente',
    instrucciones: '',
    fecha_hora: ''
  });

  useEffect(() => {
    if (role) {
      setFormData({
        id_cliente: role.id_cliente || '',
        id_domiciliario: role.id_domiciliario || '',
        direccion_recogida: role.direccion_recogida || '',
        direccion_entrega: role.direccion_entrega || '',
        estado: role.estado || 'pendiente',
        instrucciones: role.instruccionesAdc || '',
        fecha_hora: role.fecha_hora ? formatDateTime(role.fecha_hora) : ''
      });
    }
    loadUsers();
    loadDomiciliarios();
  }, [role]);

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const dt = new Date(dateTime);
    return dt.toISOString().slice(0, 16);
  };

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error('Error al cargar usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDomiciliarios = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Asegúrate de obtener el token de tu almacenamiento
      const response = await domiciliariosService.getDomiciliarios({
        headers: { Authorization: `Bearer ${token}` }
      });
      setDomiciliarios(response.data);
    } catch (err) {
      setError('Error al cargar domiciliarios');
      console.error('Error al cargar domiciliarios:', err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      if (!formData.id_cliente || !formData.direccion_recogida || !formData.direccion_entrega) {
        throw new Error('Por favor complete todos los campos requeridos');
      }

      const dataToSubmit = {
        ...formData,
        fecha_hora: new Date(formData.fecha_hora).toISOString()
      };

      await onSubmit(dataToSubmit);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al procesar el formulario');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !users.length && !domiciliarios.length) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {role ? 'Editar Solicitud' : 'Crear Solicitud'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Cliente*</label>
              <select
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Seleccione un Cliente</option>
                {users.map(user => (
                  <option key={user.id_usuario} value={user.id_usuario}>
                    {user.nombre}
                  </option>
                ))}
              </select>
            </div>

            {role && (
              <div>
                <label className="block text-sm font-medium mb-1">Domiciliario</label>
                <select
                  name="id_domiciliario"
                  value={formData.id_domiciliario}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Seleccione un Domiciliario</option>
                  {domiciliarios.map(domiciliario => (
                    <option key={domiciliario.id_domiciliario } value={domiciliario.id_domiciliario }>
                      {domiciliario.licencia_vehiculo}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Dirección Recogida*</label>
              <input
                type="text"
                name="direccion_recogida"
                value={formData.direccion_recogida}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Dirección Entrega*</label>
              <input
                type="text"
                name="direccion_entrega"
                value={formData.direccion_entrega}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Instrucciones Adicionales</label>
              <textarea
                name="instrucciones"
                value={formData.instrucciones}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                rows="3"
              />
            </div>

            {role && (
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="asignado">Asignado</option>
                  <option value="en_curso">En Curso</option>
                  <option value="completado">Completado</option>
                  <option value="reprogramado">Reprogramado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Fecha y Hora*</label>
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
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={loading}
            >
              {loading ? 'Procesando...' : role ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};