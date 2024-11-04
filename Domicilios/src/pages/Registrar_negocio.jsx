import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import axios from 'axios';
import { userService } from '../services/userService'; 

const RegistroNegocio = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: '', 
    nombre_negocio: '',
    direccion: '',
    imagen_banner: null, 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getUsers(); // Carga la lista de usuarios
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value // Si es un archivo, guarda el archivo; si no, guarda el valor
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append('id_usuario', formData.id_usuario);
    formDataToSend.append('nombre_negocio', formData.nombre_negocio);
    formDataToSend.append('direccion', formData.direccion);
    if (formData.imagen_banner) {
      formDataToSend.append('imagen_banner', formData.imagen_banner);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}negocio/registrar-negocio`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necesario para subir archivos
        },
      });
      if (response.status === 201) {
        navigate('/'); // Redirigir a la página principal o donde sea apropiado
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error al registrar negocio');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b bg-slate-400 p-4">
      <Card className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-xl shadow-2xl">
        <CardHeader className="flex flex-col gap-4 items-center justify-center pt-6 pb-4">
          <div className="w-48 h-46 border-2 border-blue-300 rounded-lg overflow-hidden bg-blue-100 shadow-inner">
            <Image
              src="/nuevo_logo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Registro de Negocio</h1>
        </CardHeader>
      
        <CardBody className="px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-base font-medium">
                  Usuario
                </label>
                <select
                  name="id_usuario"
                  value={formData.id_usuario}
                  onChange={handleInputChange}
                  className="w-full p-2 border-2 border-blue-200 rounded-lg hover:border-blue-300 focus-within:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Seleccione un usuario</option>
                  {users.map(user => (
                    <option key={user.id_usuario} value={user.id_usuario}>
                      {user.nombre} ({user.id_usuario})
                    </option>
                  ))}
                </select>
              </div>
                
              <div className="space-y-2">
                <label className="block text-gray-600 text-base font-medium">
                  Nombre del Negocio
                </label>
                <Input
                  placeholder="Ingresa el nombre del negocio"
                  type="text"
                  name="nombre_negocio"
                  value={formData.nombre_negocio}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-900 text-base placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-300",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-1",
                      "px-3",
                      "min-h-[2.5rem]"
                    ].join(" "),
                  }}
                />
              </div>
                
              <div className="space-y-2">
                <label className="block text-gray-600 text-base font-medium">
                  Dirección
                </label>
                <Input
                  placeholder="Ingresa la dirección del negocio"
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-900 text-base placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-300",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-1",
                      "px-3",
                      "min-h-[2.5rem]"
                    ].join(" "),
                  }}
                />
              </div>
                
              <div className="space-y-2">
                <label className="block text-gray-600 text-base font-medium">
                  Imagen del negocio
                </label>
                <Input
                  type="file"
                  name="imagen_banner"
                  accept="image/*"
                  onChange={handleInputChange}
                  classNames={{
                    input: "text-gray-900 text-base placeholder:text-gray-400",
                    inputWrapper: [
                      "bg-white",
                      "border-2",
                      "border-blue-200",
                      "rounded-lg",
                      "hover:border-blue-300",
                      "focus-within:border-blue-500",
                      "transition-colors",
                      "duration-200",
                      "py-1",
                      "px-3",
                      "min-h-[2.5rem]"
                    ].join(" "),
                  }}
                />
              </div>
            </div>
                
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-100/10 rounded-lg p-2 animate-pulse">
                {error}
              </div>
            )}
    
            <Button
              type="submit"
              color="primary"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-base rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out py-2 min-h-[2.5rem]"
              isLoading={isLoading}
            >
              Registrar Negocio
            </Button>
          </form>
        </CardBody>
          
        <CardFooter className="flex justify-center pb-6 pt-2">
          <p className="text-gray-500 text-sm">
            ¿Ya tienes un negocio registrado?{" "}
            <a 
              href="/" 
              className="text-blue-500 hover:text-blue-400 hover:underline transition-colors duration-200 font-medium"
            >
              Inicia sesión aquí
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>

  );
};

export default RegistroNegocio;
