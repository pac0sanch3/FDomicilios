import React from 'react';

export const Alert = ({ show, message, type }) => {
  if (!show) return null;

  return (
    <div 
      className={`mb-4 px-4 py-3 rounded-lg transition-all duration-300 ${
        type === 'error' 
          ? 'bg-red-100 text-red-800 border border-red-200' 
          : 'bg-green-100 text-green-800 border border-green-200'
      }`}
      role="alert"
    >
      {message}
    </div>
  );
};