import FormSolicitud from "./FormSolicitudes"

const ModalSolicitud = ({ isOpen, onClose })=>{

  const handleClose = (e) => {
    // Cierra el modal solo si el usuario hace clic en el fondo y no en el contenido del modal
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

    if(!isOpen) return null


    return (
      <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
      >
        <div className="bg-white p-6 rounded-lg relative">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 bg text-gray-600 hover:text-gray-900"
            >
                &times;
            </button>
            <FormSolicitud onClose={onClose} />
        </div>
      </div>
    )
}


export default ModalSolicitud