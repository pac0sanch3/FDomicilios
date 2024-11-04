import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { SolicitudesList } from './SolicitudesList';
import { SolicitudesService } from '../../services/SolicitudesServices';
import { SolicitudForm } from './SolicitudForm';
import { Alert } from '../alert/Alert';

const SolicitudesManagement = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const loadSolicitudes = async () => {
    try {
      setLoading(true);
      const response = await SolicitudesService.getSolicitud();
      setSolicitudes(response.data);
    } catch (error) {
      showAlert('Error al cargar solicitudes: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateSolicitud = async (solicitudData) => {
    try {
      setLoading(true);
      if (selectedSolicitud) {
        await SolicitudesService.updateSolicitud(selectedSolicitud.id_solicitud, solicitudData);
        showAlert('Solicitud actualizada exitosamente', 'success');
      } else {
        await SolicitudesService.createSolicitud(solicitudData);
        showAlert('Solicitud creada exitosamente', 'success');
      }
      await loadSolicitudes();
      setModalOpen(false);
      setSelectedSolicitud(null);
    } catch (error) {
      showAlert('Error: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (solicitudId, newStatus) => {
    try {
      setLoading(true);
      await SolicitudesService.updateEstado(solicitudId, newStatus);
      showAlert('Estado actualizado exitosamente', 'success');
      await loadSolicitudes();
    } catch (error) {
      showAlert('Error al actualizar estado: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    if (!statusFilter) return true;
    return solicitud.estado === statusFilter;
  });

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Gestión de Solicitudes</h3>
      
      {alert.show && <Alert {...alert} />}
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Filtrar por estado
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="asignado">Asignado</option>
          <option value="en_curso">En Curso</option>
          <option value="completado">Completado</option>
          <option value="reprogramado">Reprogramado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </div>

      <Button 
        onClick={() => {
          setSelectedSolicitud(null);
          setModalOpen(true);
        }}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mb-4"
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Crear Nueva Solicitud'}
      </Button>

      {loading && !solicitudes.length ? (
        <div className="text-center p-4">Cargando solicitudes...</div>
      ) : (
        <SolicitudesList 
          roles={filteredSolicitudes}
          onEdit={solicitud => {
            setSelectedSolicitud(solicitud);
            setModalOpen(true);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {modalOpen && (
        <SolicitudForm
          role={selectedSolicitud}
          onSubmit={handleCreateOrUpdateSolicitud}
          onClose={() => {
            setModalOpen(false);
            setSelectedSolicitud(null);
          }}
        />
      )}
    </div>
  );
};

export default SolicitudesManagement;