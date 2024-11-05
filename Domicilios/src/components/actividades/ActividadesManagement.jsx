import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { ActividadesList } from './ActividadesList';
import { actividadesService } from '../../services/actividadesService';
import { ActividadForm } from './ActividadForm';
import { Alert } from '../alert/Alert';

const ActividadesManagement = () => {
  const [actividades, setActividades] = useState([]);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    loadActividades();
  }, []);

  const loadActividades = async () => {
    try {
      const response = await actividadesService.getActividades();
      setActividades(response.data);
    } catch (error) {
      showAlert('Error al cargar actividades', 'error');
    }
  };

  const handleCreateOrUpdateActividad = async (data) => {
    try {
      if (selectedActividad) {
        await actividadesService.updateActividad(selectedActividad.id_registro, data);
        showAlert('Actividad actualizada exitosamente', 'success');
      } else {
        await actividadesService.createActividad(data);
        showAlert('Actividad registrada exitosamente', 'success');
      }
      loadActividades();
      setModalOpen(false);
      setSelectedActividad(null);
    } catch (error) {
      showAlert('Error al procesar la operación', 'error');
    }
  };

  const handleDeleteActividad = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta actividad?')) {
      try {
        await actividadesService.deleteActividad(id);
        showAlert('Actividad eliminada exitosamente', 'success');
        loadActividades();
      } catch (error) {
        showAlert('Error al eliminar actividad', 'error');
      }
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Registro de Actividades</h3>
      <Alert {...alert} />
      
      <Button 
        onClick={() => {
          setSelectedActividad(null);
          setModalOpen(true);
        }} 
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Registrar Nueva Actividad
      </Button>

      <ActividadesList 
        actividades={actividades}
        onEdit={actividad => {
          setSelectedActividad(actividad);
          setModalOpen(true);
        }}
        onDelete={handleDeleteActividad}
      />

      {modalOpen && (
        <ActividadForm
          actividad={selectedActividad}
          onSubmit={handleCreateOrUpdateActividad}
          onClose={() => {
            setModalOpen(false);
            setSelectedActividad(null);
          }}
        />
      )}
    </div>
  );
};

export default ActividadesManagement;