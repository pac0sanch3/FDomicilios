import React from 'react';

export const SolicitudesList = ({ roles, onEdit, onUpdateStatus }) => {
  return (
    <div className="space-y-4">
      {roles.map(role => (
        <div key={role.id_solicitud} className="flex justify-between items-center p-4 border rounded-lg bg-white">
          <div className="flex flex-col">
            <span className="font-medium">
              Cliente ID: {role.id_cliente}
            </span>
            <span className="text-sm text-gray-500">ID Domiciliario: {role.id_domiciliario}</span>
            <span className="text-sm text-gray-500">Dirección Recogida: {role.direccion_recogida}</span>
            <span className="text-sm text-gray-500">Dirección Entrega: {role.direccion_entrega}</span>
            <span className="text-sm text-gray-500">Estado: {role.estado}</span>
            <span className="text-sm text-gray-500">Fecha y Hora: {new Date(role.fecha_hora).toLocaleString()}</span>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => onEdit(role)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Editar
            </button>
            
            <select
              value={role.estado}
              onChange={(e) => onUpdateStatus(role.id_solicitud, e.target.value)}
              className="px-3 py-1 border rounded-lg text-gray-700"
            >
              <option value="pendiente">Pendiente</option>
              <option value="asignado">Asignado</option>
              <option value="en_curso">En Curso</option>
              <option value="completado">Completado</option>
              <option value="reprogramado">Reprogramado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      ))}
      
      {roles.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron solicitudes
        </div>
      )}
    </div>
  );
};