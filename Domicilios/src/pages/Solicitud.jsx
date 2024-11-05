import { useForm } from 'react-hook-form';
import Layout from "../components/template/Layout";
import axios from 'axios'



const Solicitud = () =>{

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {

      console.log(localStorage.getItem('userId'))

      data["fk_cliente"]=localStorage.getItem('userId')

      await axios.post(`${import.meta.env.VITE_API_URL}solicitudes/registrar`, data);
      
      alert("Se registró correctamente")
      reset()

    } catch (error) {  
      console.error(error)
      alert("lo sentimos, no se encuentran domiciliarios disponibles, intentar mas tarde")
    }
  }

  return (
    <Layout>
    <div className="bg-white/80 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Solicitar Domicilio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">Dirección de Recogida</label>
          <div className="flex items-center space-x-2">
            
            <input
              type="text"
              {...register('direccionRecogida', { required: 'Este campo es obligatorio' })}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Ingrese dirección de recogida"
            />
          </div>
          {errors.direccionRecogida && <p className="text-red-500 text-sm">{errors.direccionRecogida.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Dirección de Entrega</label>
          <div className="flex items-center space-x-2">
            
            <input
              type="text"
              {...register('direccionEntrega', { required: 'Este campo es obligatorio' })}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Ingrese dirección de entrega"
            />
          </div>
          {errors.direccionEntrega && <p className="text-red-500 text-sm">{errors.direccionEntrega.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Instrucciones Adicionales</label>
          <textarea
            {...register('instruccionesAdcc')}
            className="w-full p-2 border rounded-lg"
            rows="3"
            placeholder="Ingrese instrucciones adicionales"
          />
        </div>

        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-black/80">
          Confirmar Pedido
        </button>
      </form>
    </div>


    </Layout>
  )

}
export default Solicitud

