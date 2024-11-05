import React, { useState, useEffect } from 'react';
import { domiciliariosService } from '../../services/domiciliarioServer';
import { DomiciliariosList } from './DomiciliariosList';
import { DomiciliarioForm } from './DomiciliarioForm';
import { Alert } from '../alert/Alert';

const DomiciliariosManagement = () => {
  const [domiciliarios, setDomiciliarios] = useState([]);
  const [selectedDomiciliario, setSelectedDomiciliario] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDomiciliarios();
  }, []);

  const loadDomiciliarios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await domiciliariosService.getDomiciliarios();
      setDomiciliarios(response.data);
    } catch (error) {
      console.error('Error al cargar domiciliarios', error);
      setError('Error al cargar los domiciliarios');
      showAlert(
        error.response?.data?.message || 'Error al cargar los domiciliarios', 
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdateDomiciliario = async (formData) => {
    try {
      if (selectedDomiciliario) {
        await domiciliariosService.updateDomiciliario(
          selectedDomiciliario.id_domiciliario, 
          formData
        );
        showAlert('Domiciliario actualizado exitosamente', 'success');
      } else {
        await domiciliariosService.createDomiciliario(formData);
        showAlert('Domiciliario registrado exitosamente', 'success');
      }
      await loadDomiciliarios();
      handleCloseModal();
    } catch (error) {
      console.error('Error al procesar domiciliario', error);
      showAlert(
        error.response?.data?.message || 'Error al procesar la operación', 
        'error'
      );
    }
  };

  const handleDeleteDomiciliario = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este domiciliario?')) {
      try {
        await domiciliariosService.deleteDomiciliario(id);
        showAlert('Domiciliario eliminado exitosamente', 'success');
        await loadDomiciliarios();
      } catch (error) {
        console.error('Error al eliminar domiciliario', error);
        showAlert(
          error.response?.data?.message || 'Error al eliminar el domiciliario', 
          'error'
        );
      }
    }
  };

  const handleUpdateDisponibilidad = async (id, disponibilidad) => {
    try {
      await domiciliariosService.updateDisponibilidad(id, disponibilidad);
      showAlert('Disponibilidad actualizada exitosamente', 'success');
      await loadDomiciliarios();
    } catch (error) {
      console.error('Error al actualizar disponibilidad', error);
      showAlert(
        error.response?.data?.message || 'Error al actualizar la disponibilidad', 
        'error'
      );
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDomiciliario(null);
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Gestión de Domiciliarios</h3>

      {alert.show && (
        <div className="mb-4">
          <Alert {...alert} />
        </div>
      )}
      
      <button
        onClick={() => {
          setSelectedDomiciliario(null);
          setModalOpen(true);
        }}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Nuevo Domiciliario
      </button>

      <DomiciliariosList
        domiciliarios={domiciliarios}
        onEdit={(domiciliario) => {
          setSelectedDomiciliario(domiciliario);
          setModalOpen(true);
        }}
        onDelete={handleDeleteDomiciliario}
        onUpdateDisponibilidad={handleUpdateDisponibilidad}
      />

      {modalOpen && (
        <DomiciliarioForm
          domiciliario={selectedDomiciliario}
          onSubmit={handleCreateOrUpdateDomiciliario}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DomiciliariosManagement;

