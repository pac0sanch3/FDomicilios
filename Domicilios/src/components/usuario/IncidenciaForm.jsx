import React, { useState } from 'react';

export const IncidenciaForm = ({ incidencia, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id_usuario: incidencia?.id_usuario || '',
    id_solicitud: incidencia?.id_solicitud || '',
    tipo_incidencia: incidencia?.tipo_incidencia || 'entrega_fallida',
    descripcion: incidencia?.descripcion || '',
    estado: incidencia?.estado || 'pendiente',
    fecha_reporte: incidencia?.fecha_reporte || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0  pt-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {incidencia ? 'Editar Incidencia' : 'Crear Incidencia'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID Usuario</label>
              <input
                type="number"
                name="id_usuario"
                value={formData.id_usuario}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ID Solicitud</label>
              <input
                type="number"
                name="id_solicitud"
                value={formData.id_solicitud}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tipo de Incidencia</label>
              <select
                name="tipo_incidencia"
                value={formData.tipo_incidencia}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="entrega_fallida">Entrega Fallida</option>
                <option value="producto_danado">Producto Dañado</option>
                <option value="accidente">Accidente</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

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
                <option value="resuelto">Resuelto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Reporte</label>
              <input
                type="datetime-local"
                name="fecha_reporte"
                value={formData.fecha_reporte}
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
              {incidencia ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
