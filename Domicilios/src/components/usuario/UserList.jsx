import React from 'react';

export const UserList = ({ users, onEdit, onDelete, onToggleActive }) => {
  const handleToggleActive = (userId, currentStatus) => {
    const message = currentStatus === 'activo' 
      ? '¿Estás seguro que quieres desactivar este usuario? No podrá iniciar sesión.'
      : '¿Estás seguro que quieres activar este usuario?';
      
    if (window.confirm(message)) {
      onToggleActive(userId, currentStatus);
    }
  };

  return (
    <div className="space-y-4">
      {users.map(user => (
        <div key={user.id_usuario} className="flex justify-between items-center p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50">
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{user.nombre}</span>
            <span className="text-sm text-gray-500">{user.correo}</span>
            <span className="text-sm text-gray-500 capitalize">
              Rol: {user.tipo_usuario}
            </span>
            <span className="text-sm text-gray-500">
              Tel: {user.telefono}
            </span>
            <span className={`text-sm font-medium ${user.estado === 'activo' ? 'text-blue-600' : 'text-red-600'}`}>
              Estado: {user.estado}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded-lg"
            >
              Editar
            </button>
            
            <button
              onClick={() => handleToggleActive(user.id_usuario, user.estado)}
              className={`px-3 py-1 rounded-lg ${
                user.estado === 'activo'
                  ? 'text-red-600 hover:bg-red-100'
                  : 'text-green-600 hover:bg-green-100'
              }`}
            >
              {user.estado === 'activo' ? 'Desactivar' : 'Activar'}
            </button>
            
            <button
              onClick={() => onDelete(user.id_usuario)}
              className="px-3 py-1 text-red-600 hover:bg-red-100 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
      
      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron usuarios
        </div>
      )}
    </div>
  );
};
