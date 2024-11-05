import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}domiciliario`;

export const domiciliariosService = {
  getDomiciliarios: () => {
    return axios.get(`${API_URL}`);
  },

  createDomiciliario: (data) => {
    return axios.post(`${API_URL}`, data);
  },

  updateDomiciliario: (id, data) => {
    return axios.put(`${API_URL}/${id}`, data);
  },

  deleteDomiciliario: (id) => {
    return axios.delete(`${API_URL}/${id}`);
  },

  updateDisponibilidad: (id, disponibilidad) => {
    return axios.put(`${API_URL}/disponibilidad/${id}`, { disponibilidad });
  }
};