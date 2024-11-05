import React, { useState, useEffect } from 'react';
import { domiciliariosService } from '../../services/domiciliarioServer';

export const NovedadForm = ({ novedad, onSubmit, onClose }) => {
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [formData, setFormData] = useState({
    id_domiciliario: novedad?.id_domiciliario || '',
    id_solicitud: novedad?.id_solicitud || '',
    descripcion: novedad?.descripcion || '',
    estado: novedad?.estado || 'pendiente',
    fecha_reporte: novedad?.fecha_reporte 
      ? new Date(novedad.fecha_reporte).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    const loadDomiciliarios = async () => {
      try {
        const response = await domiciliariosService.getDomiciliarios();
        setDomiciliarios(response.data);
      } catch (error) {
        console.error('Error al cargar domiciliarios:', error);
      }
    };
    loadDomiciliarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const estadosNovedad = ['pendiente', 'en_proceso', 'resuelta', 'cancelada'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {novedad ? 'Editar Novedad' : 'Actualizar Novedad'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Domiciliario</label>
            <select
              name="id_domiciliario"
              value={formData.id_domiciliario}
              onChange={handleChange}
              required
              className="block w-full border rounded-lg p-2"
            >
              <option value="">Selecciona un domiciliario</option>
              {domiciliarios.map(domiciliario => (
                <option key={domiciliario.id_domiciliario} value={domiciliario.id_domiciliario}>
                  {domiciliario.licencia_vehiculo}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="block w-full border rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              required
              className="block w-full border rounded-lg p-2"
            >
              {estadosNovedad.map(estado => (
                <option key={estado} value={estado}>
                  {estado.charAt(0).toUpperCase() + estado.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha de reporte</label>
            <input
              type="datetime-local"
              name="fecha_reporte"
              value={formData.fecha_reporte}
              onChange={handleChange}
              required
              className="block w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
