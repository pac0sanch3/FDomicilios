import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const IncidenciasForm = () => {
  const [formData, setFormData] = useState({
    id_solicitud: '',
    tipo_incidencia: '',
    descripcion: '',
    estado: 'pendiente',
    fecha_reporte: '',
  });

  const id_usuario = localStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}insidencias/registrar`, {
        ...formData,
        id_usuario,
      });
      
      alert('Incidencia registrada con éxito');

    } catch (error) {
      console.error('Error al registrar la incidencia:', error);
      alert('Error al registrar la incidencia');
    }
  };

  return (
    <div className="flex flex-col w-full"> {/* Cambiado para que el formulario ocupe el ancho completo */}
      <h2 className="text-2xl font-bold mb-4">Registrar Incidencia</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ID de Solicitud</label>
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
              <option value="">Seleccione una opción</option>
              <option value="entrega_fallida">Entrega Fallida</option>
              <option value="producto_danado">Producto Dañado</option>
              <option value="accidente">Accidente</option>
              <option value="queja">Queja</option>
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
          <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Registrar Incidencia
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IncidenciasForm;
