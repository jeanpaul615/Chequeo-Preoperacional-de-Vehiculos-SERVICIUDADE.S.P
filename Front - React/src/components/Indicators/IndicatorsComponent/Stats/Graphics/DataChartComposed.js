import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetIndicators } from "../../../../../controllers/Indicators/Indicators/GetIndicators";

class DataChartComposed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: 'Valor',
        data: [] // Inicialmente vacío y se llenará con los datos filtrados
      }],
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
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return `${val}`; // Agrega símbolo de porcentaje
          },
          offsetY: -15, // Ajusta la posición vertical
          style: {
            fontSize: '14px', // Tamaño de fuente más grande
            colors: ["#black"], // Color del texto de las etiquetas de datos
            fontFamily: 'Roboto, Arial, sans-serif' // Fuente de las etiquetas de datos
          }
        },
        xaxis: {
          categories: [], // Inicialmente vacío y se llenará con las fechas
          position: 'bottom',
          axisBorder: {
            show: true,
            color: '#e0e0e0' // Color del borde del eje X
          },
          axisTicks: {
            show: true,
            color: '#e0e0e0' // Color de las marcas del eje X
          },
          labels: {
            style: {
              colors: '#6c757d', // Color de las etiquetas del eje X
              fontSize: '14px', // Tamaño de fuente de las etiquetas
              fontFamily: 'Roboto, Arial, sans-serif' // Fuente de las etiquetas
            }
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
            },
            formatter: function (val) {
              return `${val}`; // Agrega símbolo de porcentaje
            }
          }
        },
        title: {
          text: 'Valores de Indicadores',
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

  generateCategories = (frecuencia, data) => {
    const currentYear = new Date().getFullYear();
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    
    if (frecuencia === 'anual') {
      const years = Array.from(new Set(data.map(item => new Date(item.periodo_inicio).getFullYear())));
      return years.sort().map(year => year.toString());
    } else if (frecuencia === 'semestral') {
      return [`Jun ${currentYear}`, `Dic ${currentYear}`];
    } else if (frecuencia === 'trimestral') {
      return [`Mar ${currentYear}`, `Jun ${currentYear}`, `Sep ${currentYear}`, `Dic ${currentYear}`];
    } else if (frecuencia === 'mensual') {
      return months.map(month => `${month} ${currentYear}`);
    } else {
      return [];
    }
  }

  fetchIndicatorData = async () => {
    try {
      const response = await GetIndicators();
      
      if (!this.props.selectedIndicator) {
        console.error("selectedIndicator is not defined");
        return;
      }

      // Filtrar los datos según el id_indicador seleccionado
      const filteredData = response.filter(item => item.id_indicador === parseInt(this.props.selectedIndicator, 10));
      
      if (filteredData.length === 0) {
        console.error("No data found for selectedIndicator:", this.props.selectedIndicator);
        return;
      }

      const frecuencia = filteredData[0].frecuencia;
      const categories = this.generateCategories(frecuencia, filteredData);

      // Agrupar los valores por categorías
      const dataMap = new Map();
      filteredData.forEach(item => {
        const periodo = new Date(item.periodo_inicio);
        const category = frecuencia === 'anual'
          ? periodo.getFullYear().toString()
          : `${["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"][periodo.getMonth()]} ${periodo.getFullYear()}`;
        
        if (!dataMap.has(category)) {
          dataMap.set(category, []);
        }
        dataMap.get(category).push(item.valor);
      });

      const data = categories.map(category => {
        const values = dataMap.get(category) || [];
        return values.reduce((a, b) => a + b, 0) / (values.length || 1); // Promedio de los valores
      });

      this.setState({
        series: [{
          name: 'Valor',
          data: data, 
        }],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: categories, // Se actualizan las categorías con las fechas
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

export default DataChartComposed;
