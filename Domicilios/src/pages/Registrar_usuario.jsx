import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import axios from 'axios';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    tipo_usuario: '',
    correo: '',
    telefono: '',
    contrasena: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Si el tipo de usuario es negocio, registrar antes de redirigir
      console.log(formData) 
      if (formData.tipo_usuario === 'negocio') {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}usuario/registrar`, { ...formData, tipo_usuario: 'negocio' });
        if (response.status === 201) {
          navigate('/negocio');
        }
        return; // Asegúrate de salir de la función después de redirigir
      }

      // Para otros tipos de usuario, se registra normalmente
      const response = await axios.post(`${import.meta.env.VITE_API_URL}usuario/registrar`, formData);
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      setError(error.response?.data?.mensaje || 'Error al registrar usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b bg-slate-400 py-8 px-4">
      <Card className="w-full max-w-xs md:max-w-sm lg:max-w-md bg-white rounded-2xl shadow-lg my-2">
        <CardHeader className="flex flex-col gap-6 items-center justify-center pt-10 pb-6">
          <div className="w-32 h-32">
            <Image
              src="/nuevo_logo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Registro de Usuario</h1>
        </CardHeader>
      
        <CardBody className="px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-gray-700 text-lg font-semibold pl-1">
                  Nombre Completo
                </label>
                <Input
                  placeholder="Ingresa tu nombre"
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-800 text-lg placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-400",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-2",
                      "px-4",
                      "shadow-sm"
                    ].join(" "),
                  }}
                />
              </div>
                
              {/* Selección de tipo de usuario */}
              <div className="space-y-2">
                <label className="block text-gray-700 text-lg font-semibold pl-1">
                  Tipo de Usuario
                </label>
                <select
                  name="tipo_usuario"
                  value={formData.tipo_usuario}
                  onChange={handleInputChange}
                  className="bg-white border-2 border-blue-200 rounded-lg hover:border-blue-300 focus:border-blue-500 transition-colors duration-200 py-2 px-4 text-gray-900"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="particular">Particular</option>
                  <option value="negocio">Negocio</option>
                </select>
              </div>
                
              <div className="space-y-2">
                <label className="block text-gray-700 text-lg font-semibold pl-1">
                  Correo Electrónico
                </label>
                <Input
                  placeholder="Ingresa tu correo"
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-800 text-lg placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-400",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-2",
                      "px-4",
                      "shadow-sm"
                    ].join(" "),
                  }}
                />
              </div>
                
              <div className="space-y-2">
                <label className="block text-gray-700 text-lg font-semibold pl-1">
                  Teléfono
                </label>
                <Input
                  placeholder="Ingresa tu teléfono"
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-800 text-lg placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-400",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-2",
                      "px-4",
                      "shadow-sm"
                    ].join(" "),
                  }}
                />
              </div>
                
              <div className="space-y-2">
                <label className="block text-gray-700 text-lg font-semibold pl-1">
                  Contraseña
                </label>
                <Input
                  placeholder="Ingresa tu contraseña"
                  name="contrasena"
                  value={formData.contrasena}
                  onChange={handleInputChange}
                  type="password"
                  classNames={{
                    input: "text-gray-800 text-lg placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-400",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-2",
                      "px-4",
                      "shadow-sm"
                    ].join(" "),
                  }}
                />
              </div>
            </div>
                
            {error && (
              <div className="text-red-500 text-base text-center bg-red-100 rounded-lg p-3 border border-red-200">
                {error}
              </div>
            )}
    
            <Button
              type="submit"
              color="primary"
              className="w-full bg-blue-600 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-700 transition-colors duration-300 py-2.5 mt-4"
              isLoading={isLoading}
            >
              Registrarse
            </Button>
          </form>
        </CardBody>
          
        <CardFooter className="flex justify-center pb-8 pt-3">
          <p className="text-gray-600 text-base">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="/"
              className="text-blue-600 hover:text-blue-500 transition-colors duration-200 font-semibold"
            >
              Inicia sesión aquí
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>

  );
};

export default Registro;
