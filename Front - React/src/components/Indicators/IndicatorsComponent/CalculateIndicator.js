import React, { useState, useEffect } from 'react';

const CalculateIndicator = ({ variables, id_indicador, onCalculate }) => {
  const [result, setResult] = useState('');

  useEffect(() => {
    setResult('');
  }, []);

  const handleCalculate = () => {
    if (variables.length === 0 || !id_indicador) {
      return;
    }

    let calculation = 0;
    let isPercentage = false; // Flag to check if result should be formatted as percentage

    switch (id_indicador) {
      case 1: {
        const SiniestrosViales = parseFloat(variables.find(v => v.nombre === 'Siniestros Viales')?.value || 0);
        const ConstanteK = parseFloat(variables.find(v => v.nombre === 'Constante K')?.value || 0);
        const NumeroDeKmRecorridos = parseFloat(variables.find(v => v.nombre === 'Cantidad de Kilómetros')?.value || 0);
        if (NumeroDeKmRecorridos !== 0) {
          calculation = (SiniestrosViales * ConstanteK) / NumeroDeKmRecorridos;
        }
        break;
      }
      case 2: {
        const RiesgosIdentificadosFinAño = parseFloat(variables.find(v => v.nombre === 'Riesgos Identificados (Inicio Año)')?.value || 0);
        const RiesgosIdentificadosInicioAño = parseFloat(variables.find(v => v.nombre === 'Riesgos Identificados (Fin Año)')?.value || 0);
        calculation = (RiesgosIdentificadosFinAño - RiesgosIdentificadosInicioAño);
        break;
      }
      case 3: {
        const RiesgosVialesFindeAño = parseFloat(variables.find(v => v.nombre === 'Riesgos Viales Alto Valor (Fin Año)')?.value || 0);
        const RiesgosVialesInciodeAño = parseFloat(variables.find(v => v.nombre === 'Riesgos Viales Alto Valor (Inicio Año)')?.value || 0);
        calculation = (RiesgosVialesFindeAño - RiesgosVialesInciodeAño);
        break;
      }
      case 4: {
        const NumerodeMetasAlcanzadas = parseFloat(variables.find(v => v.nombre === 'Metas Alcanzadas')?.value || 0);
        const NumeroTotaldeMetasDefinidas = parseFloat(variables.find(v => v.nombre === 'Total Metas Proyectadas')?.value || 0);
        if (NumeroTotaldeMetasDefinidas !== 0) {
            calculation = (NumerodeMetasAlcanzadas / NumeroTotaldeMetasDefinidas) * 100;
            isPercentage = true;
          }
        break;
      }
      case 5: {
        const ActividadesEjecutadas = parseFloat(variables.find(v => v.nombre === 'Actividades Ejecutadas Plan de Trabajo')?.value || 0);
        const ActividadesProgramadas = parseFloat(variables.find(v => v.nombre === 'Actividades Programadas Plan de Trabajo')?.value || 0);
        if (ActividadesProgramadas !== 0) {
            calculation = (ActividadesEjecutadas / ActividadesProgramadas) * 100;
            isPercentage = true;
          }
        break;
      }
      case 6: {
        const VehiculosIncluidos = parseFloat(variables.find(v => v.nombre === 'Vehículos Incluidos Programa de Gestion')?.value || 0);
        const VehiculosDesplazamientoMes = parseFloat(variables.find(v => v.nombre === 'Vehículos Desplazamientos Mes')?.value || 0);
        if (VehiculosDesplazamientoMes !== 0) {
            calculation = (VehiculosIncluidos / VehiculosDesplazamientoMes) * 100;
            isPercentage = true;
          }
        break;
      }
      case 7: {
        const DesplazamientosLaboralesExcesoVelocidad = parseFloat(variables.find(v => v.nombre === 'Desplazamientos Laborales Exceso Velocidad')?.value || 0);
        const TotalDesplazamiento = parseFloat(variables.find(v => v.nombre === 'Total Desplazamientos Laborales')?.value || 0);
        if (TotalDesplazamiento !== 0) {
            calculation = (DesplazamientosLaboralesExcesoVelocidad / TotalDesplazamiento) * 100;
            isPercentage = true;
          }
        break;
      }
      case 8: {
        const VehiculosInspeccionadosDiariamente = parseFloat(variables.find(v => v.nombre === 'Vehículos Inspeccionados Diariamente')?.value || 0);
        const TotalVehiculosDiarios = parseFloat(variables.find(v => v.nombre === 'Vehículos Trabajando Diariamente')?.value || 0);
        if (TotalVehiculosDiarios !== 0) {
            calculation = (VehiculosInspeccionadosDiariamente / TotalVehiculosDiarios) * 100;
            isPercentage = true;
          }
        break;
      }
      case 9: {
        const MantenimientoEjecutado = parseFloat(variables.find(v => v.nombre === 'Mantenimiento Ejecutado')?.value || 0);
        const MantenimientoPreventivo = parseFloat(variables.find(v => v.nombre === 'Mantenimiento Programado')?.value || 0);
        if (MantenimientoPreventivo !== 0) {
            calculation = (MantenimientoEjecutado / MantenimientoPreventivo) * 100;
            isPercentage = true;
          }
        break;
      }
      case 10: {
        const ColaboradoresCapacitadosSeguridadVial = parseFloat(variables.find(v => v.nombre === 'Capacitaciones Seguridad Vial Ejecutadas')?.value || 0);
        const CapacitacionesSeguridadVialProgramadas = parseFloat(variables.find(v => v.nombre === 'Capacitaciones Seguridad Vial Programadas')?.value || 0);
        if (CapacitacionesSeguridadVialProgramadas !== 0) {
            calculation = (ColaboradoresCapacitadosSeguridadVial / CapacitacionesSeguridadVialProgramadas) * 100;
            isPercentage = true;
          }
        break;
      }
      case 11: {
        const ColaboradoresCapacitadosSeguridadVial = parseFloat(variables.find(v => v.nombre === 'Colaboradores Capacitados Seguridad Vial')?.value || 0);
        const ColaboradoresTotales = parseFloat(variables.find(v => v.nombre === 'Colaboradores Totales')?.value || 0);
        if (ColaboradoresTotales !== 0) {
            calculation = (ColaboradoresCapacitadosSeguridadVial / ColaboradoresTotales) * 100;
            isPercentage = true;
          }
        break;
      }
      case 12: {
        const CostosDirectos = parseFloat(variables.find(v => v.nombre === 'Costos Directos Siniestros Viales')?.value || 0);
        const CostosIndirectos = parseFloat(variables.find(v => v.nombre === 'Costos Indirectos Siniestros Viales')?.value || 0);
        calculation = CostosDirectos + CostosIndirectos;
        break;
      }
      case 13: {
        const NumeroDeConformidadesIdentificadas = parseFloat(variables.find(v => v.nombre === 'Numero De Conformidades Identificadas')?.value || 0);
        const NumeroConformidadesGestionadasyCerradas = parseFloat(variables.find(v => v.nombre === 'Numero Conformidades Gestionadas y Cerradas')?.value || 0);
        if (NumeroConformidadesGestionadasyCerradas !== 0) {
          calculation = (NumeroDeConformidadesIdentificadas / NumeroConformidadesGestionadasyCerradas) * 100;
          isPercentage = true;
        }
        break;
      }
      case 14: {
        const NumeroDeDiasExcedidosAlMes = parseFloat(variables.find(v => v.nombre === 'Numero De Dias Excedidos Al Mes')?.value || 0);
        const TotalDeDiasTrabajadosAlMes = parseFloat(variables.find(v => v.nombre === 'Total De Dias Trabajados Al Mes')?.value || 0);
        if (TotalDeDiasTrabajadosAlMes !== 0) {
          calculation = (NumeroDeDiasExcedidosAlMes / TotalDeDiasTrabajadosAlMes) * 100;
          isPercentage = true;
        }
        break;
      }
      default:
        console.warn('ID de indicador no reconocido');
    }
    
    setResult(isPercentage ? `${calculation.toFixed(2)}%` : calculation.toFixed(2));
    onCalculate(calculation);
  };

  return (
    <div className="flex flex-col items-start space-y-4 mt-4">
      <button
        type="button"
        onClick={handleCalculate}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-300 text-sm md:text-base"
      >
        Calcular
      </button>
      {result !== '' && (
        <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
          <p className="text-lg font-semibold">Valor Indicador:</p>
          <p className="text-xl font-bold text-blue-600">{result}</p>
        </div>
      )}
    </div>
  );
};


export default CalculateIndicator;
