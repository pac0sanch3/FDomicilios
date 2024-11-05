import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Input, Button } from "@nextui-org/react";
import { userService } from '../../services/userService';
import { Link } from 'react-router-dom';

const RecuperarPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordInfo, setPasswordInfo] = useState(null);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');
        setPasswordInfo(null);
  
        try {
            const response = await userService.recoverPassword(email);
            const { mensaje, nombre, contrasenaTemporal } = response.data; 

            // Almacenamos el mensaje y los datos necesarios en el estado
            setMessage(mensaje); 
            setPasswordInfo({ nombre, contrasena: contrasenaTemporal }); 
        } catch (error) {
            setError(error.response?.data?.mensaje || 'Error al procesar la solicitud');
        } finally {
            setIsLoading(false);
        }
    };
  
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b bg-slate-400 p-4">
            <Card className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-xl shadow-2xl">
                <CardHeader className="flex flex-col gap-4 items-center justify-center pt-6 pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Recuperar Contraseña</h1>
                </CardHeader>
  
                <CardBody className="px-6 py-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <label className="block text-gray-600 text-base font-medium">
                                Correo Electrónico
                            </label>
                            <Input
                                placeholder="Ingresa tu correo"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                classNames={{
                                    input: "text-gray-800 text-base placeholder:text-gray-400",
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
  
                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-100/10 rounded-lg p-2 animate-pulse">
                                {error}
                            </div>
                        )}
  
                        {message && (
                            <div className="text-green-500 text-sm text-center bg-green-100/10 rounded-lg p-2">
                                {message}
                            </div>
                        )}
  
                        <Button
                            type="submit"
                            color="primary"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium text-base rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out py-2 min-h-[2.5rem]"
                            isLoading={isLoading}
                        >
                            Recuperar Contraseña
                        </Button>
                    </form>
                </CardBody>
  
                <CardFooter className="flex justify-center pb-6 pt-2">
                    <Link 
                        to="/" 
                        className="text-blue-500 hover:text-blue-400 hover:underline transition-colors duration-200 font-medium"
                    >
                        Volver al inicio de sesión
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RecuperarPassword;
