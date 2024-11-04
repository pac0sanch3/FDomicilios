import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}usuario`;

export const userService = {
  // Obtener todos los usuarios
  getUsers: () => {
    return axios.get(`${API_URL}/user`);
  },

  // Obtener un usuario específico
  getUser: (id) => {
    return axios.get(`${API_URL}/user/${id}`);
  },

  // Crear un nuevo usuario
  createUser: (userData) => {
    return axios.post(`${API_URL}/registrar`, userData);
  },

  // Actualizar un usuario existente
  updateUser: (id, userData) => {
    return axios.put(`${API_URL}/actualizar/${id}`, userData);
  },

  // Eliminar un usuario
  deleteUser: (id) => {
    return axios.delete(`${API_URL}/eliminar/${id}`);
  },

  // Recuperar contraseña
  recoverPassword: (email) => {
    return axios.post(`${API_URL}/recuperar-password`, { correo: email });
  },

  // Cambiar contraseña
  cambiarContrasena: (id_usuario, passwordData) => {
    return axios.post(`${API_URL}/cambiar-contrasena`, { id_usuario, ...passwordData });
  }
};
