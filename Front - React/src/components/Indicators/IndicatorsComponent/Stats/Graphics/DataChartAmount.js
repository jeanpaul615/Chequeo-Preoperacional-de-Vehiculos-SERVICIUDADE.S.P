import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetIndicators } from "../../../../../controllers/Indicators/Indicators/GetIndicators";

class DataChartAmount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [], // Inicialmente vacío y se llenará con los datos de todos los indicadores
      options: {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: false // Oculta la barra de herramientas del gráfico
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 6, // Bordes redondeados
            dataLabels: {
              position: 'top', // Posiciona las etiquetas de datos en la parte superior
            },
          }
        },
        dataLabels: {
          enabled: false, // Deshabilitar etiquetas de datos para eliminar texto dentro y fuera de las columnas
        },
        xaxis: {
          categories: [], // Inicialmente vacío y se llenará con los nombres de los indicadores
          position: 'bottom',
          axisBorder: {
            show: false, // Ocultar borde del eje X
          },
          axisTicks: {
            show: false, // Ocultar marcas del eje X
          },
          labels: {
            show: false, // Ocultar etiquetas del eje X
          },
          tooltip: {
            enabled: true,
            style: {
              fontSize: '12px', // Tamaño de fuente del tooltip
              fontFamily: 'Roboto, Arial, sans-serif' // Fuente del tooltip
            }
          }
        },
        yaxis: {
          axisBorder: {
            show: true,
            color: '#e0e0e0' // Color del borde del eje Y
          },
          axisTicks: {
            show: true,
            color: '#e0e0e0' // Color de las marcas del eje Y
          },
          labels: {
            style: {
              colors: '#6c757d', // Color de las etiquetas del eje Y
              fontSize: '14px', // Tamaño de fuente de las etiquetas
              fontFamily: 'Roboto, Arial, sans-serif' // Fuente de las etiquetas
            }
          }
        },
        title: {
          text: 'Cantidad de Registros por Indicador',
          floating: false, // Asegúrate de que floating esté en false para que el título esté en la parte superior
          offsetY: 20, // Ajusta este valor para posicionar el título en la parte superior
          align: 'center', // Centra el título
          style: {
            color: '#333', // Color del texto del título
            fontSize: '16px', // Tamaño de fuente
            fontFamily: 'Roboto, Arial, sans-serif', // Fuente
            fontWeight: 600, // Grosor de la fuente
          },
        },
        grid: {
          borderColor: '#f1f1f1', // Color del borde de la cuadrícula
          strokeDashArray: 5, // Estilo de línea de la cuadrícula
        },
      },
    };
  }

  componentDidMount() {
    this.fetchIndicatorData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedIndicator !== this.props.selectedIndicator) {
      this.fetchIndicatorData();
    }
  }

  fetchIndicatorData = async () => {
    try {
      const response = await GetIndicators();

      if (!response || response.length === 0) {
        console.error("No data found");
        return;
      }

      // Agrupar los valores por indicadores
      const indicatorMap = new Map();
      response.forEach(item => {
        const indicatorName = item.nombre_indicador;

        if (!indicatorMap.has(indicatorName)) {
          indicatorMap.set(indicatorName, 0);
        }
        indicatorMap.set(indicatorName, indicatorMap.get(indicatorName) + 1); // Contar los registros
      });

      const categories = Array.from(indicatorMap.keys()); // Nombres de indicadores
      const data = Array.from(indicatorMap.values()); // Cantidades de registros

      this.setState({
        series: [{
          name: 'Cantidad de Registros',
          data: data, 
        }],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: categories, // Se actualizan las categorías con los nombres de los indicadores
          },
        },
      });      
    } catch (error) {
      console.error('Error fetching indicator data:', error);
    }
  }

  render() {
    return (
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <ReactApexChart 
          options={this.state.options} 
          series={this.state.series} 
          type="bar" 
          height={200} 
        />
      </div>
    );
  }
}

export default DataChartAmount;
