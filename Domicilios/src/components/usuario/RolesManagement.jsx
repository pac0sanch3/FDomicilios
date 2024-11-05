
// RolesManagement.js
import React, { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import {IncidenciaForm} from './IncidenciaForm';
import { Alert } from '../alert/Alert';
import {IncidenciaList} from './IncidenciaList';
import { IncidenciasService } from '../../services/IncidenciasService';

const RolesManagement = () => {
    const [incidencias, setIncidencias] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [selectedIncidencia, setSelectedIncidencia] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadIncidencias();
  }, []);

  const loadIncidencias = async () => {
    try {
      const response = await IncidenciasService.getIncidencias();
      setIncidencias(response.data);
    } catch (error) {
      console.error("Error al cargar incidencias", error);
    }
  };

  const handleCreateOrUpdateIncidencia = async (IncidenciasData) => {
    try {
      if (selectedIncidencia) {
        await IncidenciasService.updateIncidencias(selectedIncidencia.id_reporte, IncidenciasData);
        showAlert("Incidencia actualizada exitosamente");
      } else {
        await IncidenciasService.createIncidencias(IncidenciasData);
        showAlert("Incidencia registrada exitosamente");
      }
      loadIncidencias();
      setModalOpen(false);
      setSelectedIncidencia(null);
    } catch (error) {
      console.error("Error al procesar la incidencia", error);
    }
  };

  const handleDeleteIncidencia = async (id_reporte) => {
    if (window.confirm("¿Está seguro de eliminar esta incidencia?")) {
      try {
        await IncidenciasService.deleteIncidencias(id_reporte);
        showAlert("Incidencia eliminada exitosamente");
        loadIncidencias();
      } catch (error) {
        console.error("Error al eliminar la incidencia", error);
      }
    }
  };
  const handleToggleActive = async (id_reporte, currentStatus) => {
    try {
      await IncidenciasService.updateIncidencias(id_reporte, { 
        estado: currentStatus === 'pendiente' ? 'resuelto' : 'pendiente' 
      });
      showAlert(`Usuario ${currentStatus === 'pendiente' ? 'resuelto' : 'pendiente'} exitosamente`, 'success');
      loadIncidencias();
    } catch (error) {
      console.log(error)
      showAlert('Error al cambiar estado de la insidencia', error);
    }
  };
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Gestión de Incidencias</h3>
      <Alert {...alert} />
      {/* Listado de incidencias */}
      <IncidenciaList
        incidencias={incidencias}
        onEdit={(incidencia) => {
          setSelectedIncidencia(incidencia);
          setModalOpen(true);
        }}
        onDelete={handleDeleteIncidencia}
        onToggleActive={handleToggleActive}
      />

      {/* Botón para crear nueva incidencia */}
      <Button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        onClick={() => {
          setSelectedIncidencia(null);
          setModalOpen(true);
        }}
      >
        Registrar Nueva Incidencia
      </Button>

      {/* Modal de formulario */}
      {modalOpen && (
        <IncidenciaForm
          incidencia={selectedIncidencia}
          onSubmit={handleCreateOrUpdateIncidencia}
          onClose={() => {
            setModalOpen(false);
            setSelectedIncidencia(null);
          }}
        />
      )}
    </div>
  );
};

export default RolesManagement;
