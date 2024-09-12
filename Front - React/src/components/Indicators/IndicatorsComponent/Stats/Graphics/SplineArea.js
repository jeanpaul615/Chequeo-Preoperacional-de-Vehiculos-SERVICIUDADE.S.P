import React from "react";
import ReactApexChart from "react-apexcharts";
import { GetVariables } from "../../../../../controllers/Indicators/Variables/GetVariables";

class SplineArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: "area",
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [],
          labels: {
            style: {
              colors: "#6c757d",
            },
          },
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        responsive: [
          {
            breakpoint: 600,
            options: {
              chart: {
                height: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedIndicator !== this.props.selectedIndicator) {
      this.loadData();
    }
  }

  loadData = async () => {
    try {
      const response = await GetVariables();
      if (!response) {
        throw new Error("Datos no válidos recibidos de GetVariables.");
      }

      const filteredData = response.filter(
        (item) =>
          Number(item.indicador_id) === Number(this.props.selectedIndicator)
      );
      if (filteredData.length === 0) {
        throw new Error(
          "No se encontraron datos para el indicador seleccionado."
        );
      }

      const groupedData = this.groupDataByVariable(filteredData);

      this.setState({
        series: groupedData.series,
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: groupedData.categories,
          },
        },
      });
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  groupDataByVariable = (data) => {
    const variables = {};

    data.forEach((item) => {
      if (!variables[item.nombre]) {
        variables[item.nombre] = [];
      }
      variables[item.nombre].push({ x: item.periodo, y: item.valor });
    });

    const series = Object.keys(variables).map((key) => ({
      name: key,
      data: variables[key],
    }));

    const categories = [...new Set(data.map((item) => item.periodo))];

    return { series, categories };
  };

  render() {
    return (
      <div className="w-full h-full p-4 bg-gray-50">
        <div id="chart" className="chart-container">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height="100%"
          />
        </div>
        <style>{`
    .chart-container {
      width: 200%;
    }

    @media (max-width: 600px) {
      .chart-container {
        width: 100%;
      }
    }
  `}</style>
      </div>
    );
  }
}

export default SplineArea;
