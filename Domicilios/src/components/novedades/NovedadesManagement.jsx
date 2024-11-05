import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { NovedadesList } from './NovedadesList';
import { novedadesService } from '../../services/novedadesService';
import { NovedadForm } from './NovedadesForm';
import { Alert } from '../alert/Alert';

const NovedadesManagement = () => {
  const [novedades, setNovedades] = useState([]);
  const [selectedNovedad, setSelectedNovedad] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const loadNovedades = async () => {
    try {
      const response = await novedadesService.getNovedad();
      setNovedades(response.data);
    } catch (error) {
      showAlert('Error al cargar novedades', 'error');
      console.error('Error loading novedades:', error);
    }
  };

  useEffect(() => {
    loadNovedades();
  }, []);

  const handleUpdateNovedad = async (data) => {
    try {
      const formattedData = {
        ...data,
        fecha_reporte: new Date(data.fecha_reporte).toISOString().slice(0, 19).replace('T', ' ')
      };

      if (selectedNovedad) {
        await novedadesService.updateNovedad(selectedNovedad.id_novedad, formattedData);
        showAlert('Novedad actualizada exitosamente', 'success');
        await loadNovedades();
      }
      
      setModalOpen(false);
      setSelectedNovedad(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Error desconocido';
      showAlert('Error al actualizar la novedad: ' + errorMessage, 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Gestión de Novedades</h3>
      </div>

      {alert.show && <Alert {...alert} />}

      <NovedadesList 
        novedades={novedades}
        onEdit={novedad => {
          setSelectedNovedad(novedad);
          setModalOpen(true);
        }}
      />

      {modalOpen && (
        <NovedadForm
          novedad={selectedNovedad}
          onSubmit={handleUpdateNovedad}
          onClose={() => {
            setModalOpen(false);
            setSelectedNovedad(null);
          }}
        />
      )}
    </div>
  );
};

export default NovedadesManagement;
