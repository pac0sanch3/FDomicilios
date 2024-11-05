import IncidenciasForm from "./IncidenciasForm";

const ModalIncidencias = ({ isOpen, onClose }) => {
  const handleClose = (e) => {
    // Cierra el modal solo si el usuario hace clic en el fondo
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="bg-white p-6 rounded-lg relative w-11/12 max-w-2xl"> {/* Cambiado para ser más ancho */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <IncidenciasForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalIncidencias;
