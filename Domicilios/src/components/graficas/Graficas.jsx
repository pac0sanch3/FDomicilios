import React, { useEffect, useState } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title
);

const Graficas = () => {
  const [incidenciasData, setIncidenciasData] = useState({
    labels: [],
    datasets: [],
  });
  const [pedidosData, setPedidosData] = useState({
    labels: [],
    datasets: [],
  });
  const [rendimientoData, setRendimientoData] = useState({
    labels: [],
    datasets: [],
  });
  const [tiempoEntregaData, setTiempoEntregaData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const obtenerEstadisticasIncidencias = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}usuario/reportes/incidencias`);
        const result = await response.json();
        
        if (!result || result.length === 0) {
          console.log('No hay datos de incidencias');
          return;
        }

        const labels = result.map(item => item.tipo_incidencia);
        const totals = result.map(item => item.total_incidencias);

        setIncidenciasData({
          labels: labels,
          datasets: [
            {
              label: 'Total de Incidencias',
              data: totals,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener estadísticas de incidencias:', error);
      }
    };

    const obtenerEstadisticasPedidos = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}usuario/reportes/cantidad-pedidos`);
        const result = await response.json();
        
        if (!result || !result.total_pedidos) {
          console.log('No hay datos de pedidos');
          return;
        }

        setPedidosData({
          labels: ['Total de Pedidos'],
          datasets: [
            {
              label: 'Cantidad de Pedidos',
              data: [result.total_pedidos],
              backgroundColor: ['#36A2EB'],
              borderColor: ['#36A2EB'],
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener estadísticas de pedidos:', error);
      }
    };

    const obtenerEstadisticasRendimiento = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}usuario/reportes/rendimiento-domiciliarios`);
        const result = await response.json();
        
        if (!result || result.length === 0) {
          console.log('No hay datos de rendimiento');
          return;
        }

        const labels = result.map(item => item.nombre);
        const rendimientos = result.map(item => item.promedio_entrega);

        setRendimientoData({
          labels: labels,
          datasets: [
            {
              label: 'Promedio de Entrega por Domiciliario (minutos)',
              data: rendimientos,
              backgroundColor: '#4BC0C0',
              borderColor: '#4BC0C0',
              borderWidth: 1,
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener estadísticas de rendimiento:', error);
      }
    };

    const obtenerEstadisticasTiempoEntrega = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}usuario/reportes/tiempo-promedio-entrega`);
        const result = await response.json();
        
        if (!result || !result.promedio_entrega) {
          console.log('No hay datos de tiempo de entrega');
          return;
        }

        const labels = ['Promedio de Tiempo de Entrega'];
        const tiempo = [result.promedio_entrega];

        setTiempoEntregaData({
          labels: labels,
          datasets: [
            {
              label: 'Tiempo Promedio de Entrega (minutos)',
              data: tiempo,
              backgroundColor: '#FF6384',
              borderColor: '#FF6384',
              borderWidth: 1,
              tension: 0.1,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener estadísticas de tiempo promedio de entrega:', error);
      }
    };

    obtenerEstadisticasIncidencias();
    obtenerEstadisticasPedidos();
    obtenerEstadisticasRendimiento();
    obtenerEstadisticasTiempoEntrega();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        font: {
          size: 16
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-white">
      <h3 className="text-3xl font-bold mb-8 text-gray-800">Dashboard de Estadísticas</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {/* Gráfico de Incidencias */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold mb-6 text-gray-700">Incidencias</h4>
          <div className="h-[300px] lg:h-[400px]">
            {incidenciasData.labels.length > 0 ? (
              <Pie data={incidenciasData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>

        {/* Gráfico de Cantidad de Pedidos */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold mb-6 text-gray-700">Cantidad de Pedidos</h4>
          <div className="h-[300px] lg:h-[400px]">
            {pedidosData.labels.length > 0 ? (
              <Bar data={pedidosData} options={{
                ...chartOptions,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>

        {/* Gráfico de Rendimiento de Domiciliarios */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold mb-6 text-gray-700">Rendimiento de Domiciliarios</h4>
          <div className="h-[300px] lg:h-[400px]">
            {rendimientoData.labels.length > 0 ? (
              <Bar data={rendimientoData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>

        {/* Gráfico de Tiempo Promedio de Entrega */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold mb-6 text-gray-700">Tiempo Promedio de Entrega</h4>
          <div className="h-[300px] lg:h-[400px]">
            {tiempoEntregaData.labels.length > 0 ? (
              <Line data={tiempoEntregaData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No hay datos disponibles
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graficas;
