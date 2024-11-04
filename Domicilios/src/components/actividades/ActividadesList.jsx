import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';

export const ActividadesList = ({ actividades, onEdit, onDelete }) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers();
      const usersMap = {};
      response.data.forEach(user => {
        usersMap[user.id_usuario] = user.nombre;
      });
      setUsers(usersMap);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {actividades.map(actividad => (
        <div key={actividad.id_registro} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
          <div className="flex flex-col">
            <span className="font-medium">
              Usuario: {users[actividad.id_usuario] || actividad.id_usuario}
            </span>
            <span className="text-sm text-gray-500">Descripción: {actividad.descripcion}</span>
            <span className="text-sm text-gray-500">
              Fecha: {new Date(actividad.fecha_hora).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
              Creado: {new Date(actividad.fecha_creacion).toLocaleString()}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-x-2">
            <button
              onClick={() => onEdit(actividad)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              Editar
            </button>
            
            <button
              onClick={() => onDelete(actividad.id_registro)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      
      {actividades.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron actividades registradas
        </div>
      )}
    </div>
  );
};