import React, { useEffect, useState } from 'react';
import { useSolicitudes } from '../../services/SolicitudesProvider';

const NotificacionesBell = () => {
    const { listarSolicitudes, solicitudes, error, loading } = useSolicitudes();
    const [selectedSolicitud, setSelectedSolicitud] = useState(null);

    useEffect(() => {
        listarSolicitudes(); // Llama a la función al cargar el componente
    }, []);

    // Filtra las solicitudes para mostrar solo las que tienen el estado "pendiente" o "en_curso"
    const solicitudesPendientes = solicitudes.filter(solicitud => solicitud.estado === 'en_curso');

    return (
        <div className="p-4 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Notificaciones</h2>

            {loading && (
                <p className="text-gray-600">Cargando...</p>
            )}
            {error && (
                <p className="text-red-500 text-md font-semibold mb-4">
                    Error: {error.mensaje}
                </p>
            )}

            {solicitudesPendientes.length > 0 ? (
                <ul>
                    {solicitudesPendientes.map((solicitud) => (
                        <li key={solicitud.id_solicitud} className="flex items-start justify-between p-3 border-b border-gray-200">
                            <div>
                                <p className="text-gray-800 font-semibold">
                                    {`Nueva solicitud: ${solicitud.id_solicitud}`}
                                </p>
                                <p className="text-gray-500 text-sm">{`Dirección de entrega: ${solicitud.direccion_entrega}`}</p>
                                <p className="text-gray-500 text-xs">{`Cliente: ${solicitud.nombre_cliente || 'No disponible'}`}</p>
                            </div>
                            <span className="bg-green-500 h-2 w-2 rounded-full mt-1"></span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No hay notificaciones pendientes.</p>
            )}
        </div>
    );
};

export default NotificacionesBell;