import axios from "axios";
import { Button } from '@nextui-org/react';
import Header from "../../components/layout/Header"
import ModalSolicitud from "../solicitudes/ModalSolicitud";

import { useState , useEffect} from 'react'
import ModalIncidencias from "../Incidencias/ModalIncidencias";


const HomeCliente = () =>{
  const [isModalIncidenciasOpen, setIsModalIncidenciasOpen] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false)


  const [soliCompletadas, setSoliCompl] = useState([])
  const [soliEnCurso, setSoliEnCurso] = useState([])
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    buscarSolicitudes()
    setIsModalOpen(false);
  };
  const openModalIncidencias = () => {

    setIsModalIncidenciasOpen(true);
  };
  const closeModalIncidencias = () => {

    setIsModalIncidenciasOpen(false);
  };

  const buscarSolicitudes = async ()=>{
    try{
      const idUser = localStorage.getItem('userId')

      const respuesta = await axios.get(`${import.meta.env.VITE_API_URL}solicitudes/listarSoliClientes/${idUser}`)

      let contenidoGen = respuesta?.data?.response
      

      const soliEnCurso = contenidoGen.filter(solicitud => solicitud.estado == "en_curso" ||solicitud.estado == "pendiente"  )
      
      setSoliEnCurso(soliEnCurso)
      
      const soliCompletado = contenidoGen.filter(solicitud => solicitud.estado == "completado")
      setSoliCompl(soliCompletado)


    }
    catch(error){
      console.error(error)
    }
  }

  useEffect(()=>{
    buscarSolicitudes()
  }, [])





  return (
    <>
      <Header color="bg-white shadow-sm" />
      <div className="min-h-screen">
        {/* Panel principal con imagen y contenido */}
        <div className="flex pt-28 flex-col md:flex-row w-full min-h-screen">
          {/* Sección de imagen (2/3 del ancho) */}
          <div className="w-full md:w-2/3 h-64 md:h-screen relative p-5 md:p-20">

  <img 
    src="/imagen2AL.jpg"
    alt="Imagen principal" 
    className="w-full h-full object-cover object-center md:object-top"
  />
</div>

          
          {/* Sección de información (1/3 del ancho) */}
          <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white">
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-gray-600 mb-8">
              Tus pedidos, a un toque de distancia
            </p>
            <button
            onClick={openModal} 
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full md:w-auto">
              Realizar Pedido
            </button>
          </div>
        </div>
        <ModalSolicitud 
        isOpen={isModalOpen} 
        onClose={closeModal}
        />
  
        {/* Componente que aparece al hacer scroll */}
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Pedidos en proceso</h2>

            <div>
            {
  soliEnCurso.map((solicitud) => (
    <div 
      key={solicitud.id_solicitud}
      className="
        w-full 
        max-w-full 
        sm:max-w-xl 
        md:max-w-2xl 
        lg:max-w-4xl 
        xl:max-w-5xl 
        mx-auto 
        bg-white 
        shadow-lg 
        rounded-xl 
        overflow-hidden 
        transition-all 
        duration-300 
        hover:shadow-xl 
        border-l-4 
        border-blue-500
        mb-6
      "
    >
      <div className="p-4 sm:p-6">
        {/* Sección de Información Personal */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
            Información Domiciliario
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            <div className="space-y-2">
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Nombre:</span> 
                {solicitud.nombre}
              </p>
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Correo:</span> 
                {solicitud.correo}
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Teléfono:</span> 
                {solicitud.telefono}
              </p>
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Licencia:</span> 
                {solicitud.licencia_vehiculo}
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Detalles de la Solicitud */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Detalles del pedido
            </h3>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">ID del pedido:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {solicitud.id_solicitud}
            </p>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">Dirección Recogida:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {solicitud.direccion_recogida}
            </p>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">Dirección Entrega:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              {solicitud.direccion_entrega}
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Información Adicional
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              <span className="font-medium mr-2">Instrucciones:</span>
              {solicitud.instruccionesAdc}
            </p>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">Estado:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              {solicitud.estado}
            </p>
          </div>
        </div>

        {/* Footer de la Tarjeta */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <div className="text-sm text-gray-500"> 
            {/* Botón para crear nueva incidencia */}

          </div>
          <div className="text-xs sm:text-sm text-gray-500">
            <span className="font-medium">Fecha:</span> {new Date(solicitud.fecha_creacion).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  ))
}
            </div>
          </div>
          <div className="max-w-4xl mx-auto my-14">
            <h2 className="text-3xl font-bold mb-6">Historial de pedidos completados</h2>
            <div>
            {
  soliCompletadas.map((solicitud) => (
    <div 
      key={solicitud.id_solicitud}
      className="
        w-full 
        max-w-full 
        sm:max-w-xl 
        md:max-w-2xl 
        lg:max-w-4xl 
        xl:max-w-5xl 
        mx-auto 
        bg-white 
        shadow-lg 
        rounded-xl 
        overflow-hidden 
        transition-all 
        duration-300 
        hover:shadow-xl 
        border-l-4 
        border-gray-500
        mb-6
      "
    >
      <div className="p-4 sm:p-6">
        {/* Sección de Información Personal */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">
            Información Domiciliario
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
            <div className="space-y-2">
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Nombre:</span> 
                {solicitud.nombre}
              </p>
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Correo:</span> 
                {solicitud.correo}
              </p>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Teléfono:</span> 
                {solicitud.telefono}
              </p>
              <p className="flex items-center text-sm sm:text-base">
                <span className="font-semibold mr-2">Licencia:</span> 
                {solicitud.licencia_vehiculo}
              </p>
            </div>
          </div>
        </div>

        {/* Sección de Detalles de la Solicitud */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Detalles del pedido
            </h3>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">ID del pedido:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {solicitud.id_solicitud}
            </p>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">Dirección Recogida:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              {solicitud.direccion_recogida}
            </p>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">Dirección Entrega:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              {solicitud.direccion_entrega}
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Información Adicional
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              <span className="font-medium mr-2">Instrucciones:</span>
              {solicitud.instruccionesAdc}
            </p>
            <p className="flex items-center mb-1 text-sm sm:text-base">
              <span className="font-medium mr-2">Estado:</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              {solicitud.estado}
            </p>
          </div>
        </div>

        {/* Footer de la Tarjeta */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                <div className="text-sm text-gray-500"> 
                <Button
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  onClick={openModalIncidencias} 
                >
                  Registrar Nueva Incidencia
                </Button>

                <ModalIncidencias 
                  isOpen={isModalIncidenciasOpen} 
                  onClose={closeModalIncidencias}
                />


                </div>

                      <div className="text-xs sm:text-sm text-gray-500">
                        <span className="font-medium">Fecha:</span> {new Date(solicitud.fecha_creacion).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );

}


export default HomeCliente

