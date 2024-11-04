import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}solicitudes`;

export const SolicitudesService = {
  getSolicitud: () => {
    return axios.get(`${API_URL}/listar`);
  },

  createSolicitud: (solicitudData) => {
    return axios.post(`${API_URL}/registrar`, {
      fk_cliente: solicitudData.id_cliente,
      direccionRecogida: solicitudData.direccion_recogida,
      direccionEntrega: solicitudData.direccion_entrega,
      instruccionesAdcc: solicitudData.instrucciones || ''
    });
  },

  updateSolicitud: (id, solicitudData) => {
    return axios.put(`${API_URL}/actualizar`, {
      idSolicitud: id,
      fk_cliente: solicitudData.id_cliente,
      fk_domiciliario: solicitudData.id_domiciliario,
      direccionRecogida: solicitudData.direccion_recogida,
      direccionEntrega: solicitudData.direccion_entrega,
      estado: solicitudData.estado,
      instruccionesAdcc: solicitudData.instrucciones || ''
    });
  },

  updateEstado: (idSolicitud, estado) => {
    return axios.put(`${API_URL}/actualizarEstado`, {
      idSolicitud,
      estado
    });
  }
};
