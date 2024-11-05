import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}actividades`;

export const actividadesService = {
  getActividades: () => {
    return axios.get(`${API_URL}`);
  },

  getActividad: (id) => {
    return axios.get(`${API_URL}/${id}`);
  },

  createActividad: (data) => {
    return axios.post(`${API_URL}`, data);
  },

  updateActividad: (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
  },

  deleteActividad: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  }
};