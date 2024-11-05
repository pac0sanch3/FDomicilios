import React, { useState, useEffect } from 'react';
import { userService } from '../../services/userService';

export const DomiciliariosList = ({ 
  domiciliarios, 
  onEdit, 
  onDelete,
  onUpdateDisponibilidad 
}) => {
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
      {domiciliarios.map(domiciliario => (
        <div 
          key={domiciliario.id_domiciliario}
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">
                Usuario: {users[domiciliario.id_usuario] || domiciliario.id_usuario}
              </h3>
              <p className="text-sm text-gray-600">
                Licencia: {domiciliario.licencia_vehiculo}
              </p>
              <div className="flex items-center space-x-2">
                <span 
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${domiciliario.disponibilidad === 'disponible' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }`}
                >
                  {domiciliario.disponibilidad}
                </span>
                <button
                  onClick={() => onUpdateDisponibilidad(
                    domiciliario.id_domiciliario,
                    domiciliario.disponibilidad === 'disponible' ? 'no disponible' : 'disponible'
                  )}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  Cambiar disponibilidad
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(domiciliario)}
                className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      ))}

      {domiciliarios.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron domiciliarios registrados
          </p>
        </div>
      )}
    </div>
  );
};
