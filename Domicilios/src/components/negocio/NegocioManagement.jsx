import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { NegociosList } from './NegocioList';
import { NegocioForm } from './NegocioForm';
import { Alert } from '../alert/Alert';
import { NegocioService } from '../../services/negocioservice';

export const NegocioManagement = () => {
  const [negocios, setNegocios] = useState([]);
  const [selectedNegocio, setSelectedNegocio] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    loadNegocios();
  }, []);

  const loadNegocios = async () => {
    try {
      const response = await NegocioService.getNegocio();
      setNegocios(response.data);
    } catch (error) {
      showAlert('Error al cargar negocios', 'error');
    }
  };

  const handleCreateOrUpdateNegocio = async (data) => {
    try {
      if (selectedNegocio) {
        await NegocioService.updateNegocio(selectedNegocio.id_negocio, data);
        showAlert('Negocio actualizado exitosamente', 'success');
      } else {
        await NegocioService.createNegocio(data);
        showAlert('Negocio registrado exitosamente', 'success');
      }
      loadNegocios();
      setModalOpen(false);
      setSelectedNegocio(null);
    } catch (error) {
      showAlert('Error al procesar la operación', 'error');
    }
  };

  const handleDeleteNegocio = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este negocio?')) {
      try {
        await NegocioService.deleteNegocio(id);
        showAlert('Negocio eliminado exitosamente', 'success');
        loadNegocios();
      } catch (error) {
        showAlert('Error al eliminar negocio', 'error');
      }
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Gestión de Negocios</h3>
      <Alert {...alert} />
      
      <Button 
        onClick={() => {
          setSelectedNegocio(null);
          setModalOpen(true);
        }} 
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Crear Negocio
      </Button>

      <NegociosList 
        negocios={negocios}
        onEdit={negocio => {
          setSelectedNegocio(negocio);
          setModalOpen(true);
        }}
        onDelete={handleDeleteNegocio}
      />

      {modalOpen && (
        <NegocioForm
          negocio={selectedNegocio}
          onSubmit={handleCreateOrUpdateNegocio}
          onClose={() => {
            setModalOpen(false);
            setSelectedNegocio(null);
          }}
        />
      )}
    </div>
  );
};
