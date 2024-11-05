import React from 'react';
import { NegocioService } from '../../services/negocioservice';

export const NegociosList = ({ negocios, onEdit, onDelete }) => {
  return (
    <div className="space-y-4 mt-4">
      {negocios.map((negocio) => (
        <div key={negocio.id_negocio} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
          <div className="flex flex-col">
            <h3 className="font-medium">{negocio.nombre_negocio}</h3>
            <p className="text-sm text-gray-500">Dirección: {negocio.direccion}</p>
            <p className="text-sm text-gray-500">Imagen: {negocio.imagen_banner}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-x-2">
            <button
              onClick={() => onEdit(negocio)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(negocio.id_negocio)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      {negocios.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron negocios registrados
        </div>
      )}
    </div>
  );
};
