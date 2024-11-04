import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}insidencias`;

export const IncidenciasService = {
  // Obtener todos los usuarios
  getIncidencias: () => {
    return axios.get(`${API_URL}/listar`);

  },

  // Crear un nuevo usuario
  createIncidencias: (IncidenciasData) => {
    return axios.post(`${API_URL}/registrar`, IncidenciasData);
  },

  // Actualizar un usuario existente
  updateIncidencias: (id, IncidenciasData) => {
    return axios.put(`${API_URL}/editar/${id}`, IncidenciasData);
  },

  // Eliminar un usuario
  deleteIncidencias: (id) => {
    return axios.delete(`${API_URL}/eliminar/${id}`);
  }

};