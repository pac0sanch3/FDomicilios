    import React, { createContext, useContext, useState } from 'react';
    import axios from 'axios';

    const SolicitudesContext = createContext();

    export const SolicitudesProvider = ({ children }) => {
        const [infoSolicitud, setInfoSolicitud] = useState(null);
        const [solicitudes, setSolicitudes] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(false);
        const [isFetching, setIsFetching] = useState(false);

        // Función para registrar una solicitud
        const registrarSolicitud = async (solicitudData) => {
            try {
                setLoading(true);
                setError(null);

                const response = await axios.post(`${import.meta.env.VITE_API_URL}solicitudes/registrar`, solicitudData);
                setInfoSolicitud(response.data.infoSolicitudCo); // Guardamos la información de la solicitud en el estado
            } catch (error) {
                setError(error.response ? error.response.data : { mensaje: "Error en el servidor" });
            } finally {
                setLoading(false);
            }
        };

        const listarSolicitudes = async (retries = 3) => {
            if (isFetching) return; // Evitar llamadas duplicadas
            setIsFetching(true);
            try {
                setLoading(true);
                setError(null);
        
                if (!navigator.onLine) {
                    setError({ mensaje: 'Sin conexión a internet', status: 'OFFLINE' });
                    return;
                }
        
                const response = await axios.get(`${import.meta.env.VITE_API_URL}solicitudes/listar`, {
                    timeout: 10000,
                });
                setSolicitudes(response.data);
            } catch (error) {
                if (error.code === 'ECONNABORTED' && retries > 0) {
                    console.warn(`Reintentando... (${3 - retries + 1})`);
                    setTimeout(() => listarSolicitudes(retries - 1), 1000);
                } else {
                    setError({
                        mensaje: 'La solicitud no pudo completarse. Intenta nuevamente.',
                        status: error.code || 'UNKNOWN_ERROR',
                    });
                }
            } finally {
                setLoading(false);
                setIsFetching(false);
            }
        };
        
        return (
            <SolicitudesContext.Provider value={{ infoSolicitud, registrarSolicitud, listarSolicitudes, solicitudes, error, loading }}>
                {children}
            </SolicitudesContext.Provider>
        );
    };

    // Hook para usar el contexto
    export const useSolicitudes = () => useContext(SolicitudesContext); 