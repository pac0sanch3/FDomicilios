import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Image } from "@nextui-org/react";
import axios from 'axios';

const Inicio = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    correo: '',
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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}usuario/login`, formData);


      
      // Verificar el estado del usuario
      if (response.data.usuario.estado === 'inactivo') {
        setError('Tu cuenta está desactivada. Por favor, contacta al administrador.');
        return;
      }
      
      if (response.data.token) {
        // Guardar token
        localStorage.setItem('token', response.data.token);
        
        // Guardar datos del usuario
        localStorage.setItem('userId', response.data.usuario.id.toString());
        localStorage.setItem('userType', response.data.usuario.tipo_usuario);
        localStorage.setItem('userName', response.data.usuario.nombre);
        localStorage.setItem('userEmail', response.data.usuario.correo);
        
        // También guardamos todos los datos del usuario en un solo objeto
        localStorage.setItem('userData', JSON.stringify(response.data.usuario));

        console.log(localStorage.getItem('userData'));
        
        navigate('/home');
      }
    } catch (error) {
      console.error("Error during login:", error); // Log completo del error
      if (error.response?.data?.mensaje) {
        setError(error.response.data.mensaje);
      } else if (error.response?.status === 401) {
        setError('Credenciales inválidas');
      } else {
        setError('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-8 px-4">
      <Card className="w-full max-w-xs md:max-w-sm lg:max-w-md bg-white rounded-2xl shadow-lg my-2">
        <CardHeader className="flex flex-col gap-6 items-center justify-center pt-10 pb-6">
          <div className="w-32 h-32">
            <Image
              src="/nuevo_logo.jpeg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-blue-700">
            Bienvenido
          </h1>
        </CardHeader>
      
        <CardBody className="px-6 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-5">
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
                  Contraseña
                </label>
                <Input
                  placeholder="Ingresa tu contraseña"
                  name="contrasena"
                  type="password"
                  value={formData.contrasena}
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
                
              <div className="text-center pt-2">
                <Link
                  to="/recuperar-password"
                  className="text-base text-blue-600 hover:text-blue-500 transition-colors duration-200 inline-block"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
                
            {error && (
              <div className="text-red-500 text-base text-center bg-red-50 rounded-lg p-3 border border-red-200">
                {error}
              </div>
            )}
    
            <Button
              type="submit"
              color="primary"
              className="w-full bg-blue-600 text-white font-semibold text-lg rounded-lg shadow hover:bg-blue-700 transition-colors duration-300 py-2.5 mt-4"
              isLoading={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
        </CardBody>
          
        <CardFooter className="flex justify-center pb-8 pt-3">
          <p className="text-gray-600 text-base">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/registro"
              className="text-blue-600 hover:text-blue-500 transition-colors duration-200 font-semibold"
            >
              Regístrate aquí
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>

  );
};

export default Inicio;