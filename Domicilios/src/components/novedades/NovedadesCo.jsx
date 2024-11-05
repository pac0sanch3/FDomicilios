import axios from 'axios';
import { useState,  useEffect } from 'react';
import { useForm } from 'react-hook-form';

const NovedadesCo = ()=> {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const [soli , setSoli] = useState([])
  const [idDomici , setDomic] = useState()

  const onSubmit = async(data) => {

    try{
      data['id_domiciliario'] = idDomici


      console.log(data)

      const response = await axios.post(`${import.meta.env.VITE_API_URL}novedad/`, data)
  
  
      console.log(response)
      alert("se registro con exito")
      reset()
    }
    catch(error){
      console.error(error)
      alert("a currido un error")
    }

  }

  useEffect(() => {
    const fetchSolicitudes = async () => {
        try {
          /* traer el id del localhost.*/

          const idUser = localStorage.getItem('userId')

          /* primeros consultamos el id del domiciliario que pertenece a ese usuario */

          const respuesta = await axios.get(`${import.meta.env.VITE_API_URL}solicitudes/buscarDomic/${idUser}`)

          let idDomiciliario = respuesta.data.response[0].id_domiciliario

          setDomic(idDomiciliario)

          /* consulta de las solicitudes que tiene ese domiciliario */
          
          const soli = await axios.get(`${import.meta.env.VITE_API_URL}solicitudes/listSolicitudesDom/${idDomiciliario}`)

          console.log(soli)
          setSoli(soli.data.response)
        } catch (error) {
            console.error("Error al obtener las solicitudes:", error);
        }
  }

  fetchSolicitudes()
}, [])

//ubicacionActual

  


  return (
    <>
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">

    <h2 className="text-2xl font-bold mb-6">Registrar una novedad </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Descripción */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Descripcion de la novedad:</label>
          <textarea
            {...register('descripcion')}
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Ingrese la descripcion de la novedad"
          />
          {errors.descripcion && (
            <span className="text-sm text-red-500">{errors.descripcion.message}</span>
          )}
        </div>

        {/* ubicacion del domiciliario */}

        <div className="space-y-2">
          <label className="block text-sm font-medium">Ubicacion actual:</label>
          <input
            {...register('ubicacionActual')}
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Ingrese su ubicacion"
          />
          {errors.ubicacionActual && (
            <span className="text-sm text-red-500">{errors.ubicacionActual.message}</span>
          )}
        </div>


        {/* para seleccionar una solicitud */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Seleccione una solicitud
          </label>
          <select 
            {...register('id_solicitud')} 
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Seleccione una opción</option>
            {soli.map((item) => (
              <option 
                key={item.id_solicitud} 
                value={item.id_solicitud}
              >
              Recogida: {item.direccion_recogida} - Entrega: {item.direccion_entrega}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Enviar */}
        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/80">
          Registrar novedad
        </button>
      </form>
    </div>
    </>
  )
}

export default NovedadesCo