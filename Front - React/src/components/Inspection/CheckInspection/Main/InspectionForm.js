import React, { useEffect, useState } from "react";
import Container from "./Container";
import Swal from "sweetalert2";
import Comments from "./Comments";
import { CreateMaintenance } from "../../../../controllers/Inspection/MaintenanceControllers/CreateMaintenance";
import {
  NewInspection,
  NewVehicleCondition,
} from "../../../../controllers/Inspection/InspectionControllers/NewInspection";
import { VerifyInspection } from "../../../../controllers/Inspection/InspectionControllers/VerifyInspection";
import { SendReport } from "../../../../controllers/Inspection/SendReportControllers/SendReport";

/**
 * Componente de formulario de inspección.
 * Este componente renderiza un formulario de inspección con una serie de campos predefinidos.
 * Los datos del formulario se manejan mediante el estado local y se envían a un contenedor para su gestión.
 */
const InspectionForm = () => {
  // Estado inicial del formulario con todos los campos establecidos en "Bien".
  const initialFormData = {
    fecha: "",
    driver_id: "",
    vehicle_id: "",
    inspection_id: "",
    nombre_conductor: "",
    licencia: "",
    seguridad_social: "",
    tipo_vehiculo: "",
    placa: "",
    marca: "",
    dependencia: "",
    kilometraje: "",
    soat: "",
    rtm: "",
    aceite_motor: "Bien",
    aceite_hidraulico: "Bien",
    liquido_de_frenos: "Bien",
    refrigerante: "Bien",
    agua_parabrisas: "Bien",
    nivel_combustible: "Bien",
    presion_aire: "Bien",
    lubricacion: "Bien",
    panel_de_control: "Bien",
    nivel_de_combustibles: "Bien",
    carga_bateria: "Bien",
    temperatura_motor: "Bien",
    tacometro_velocimetro: "Bien",
    parabrisas: "Bien",
    limpia_parabrisas: "Bien",
    laterales: "Bien",
    vidrio_trasero: "Bien",
    limpia_parabrisas_trasero: "Bien",
    espejo_retrovisor: "Bien",
    espejos_laterales: "Bien",
    bajas: "Bien",
    plenas: "Bien",
    direccionales: "Bien",
    cocuyos: "Bien",
    reversa: "Bien",
    antiniebla: "Bien",
    cabina: "Bien",
    emergencia: "Bien",
    tablero_y_testigos: "Bien",
    freno_de_seguridad: "Bien",
    alarma_de_reversa: "Bien",
    cinturon_de_seguridad: "Bien",
    bocina: "Bien",
    apoya_cabezas: "Bien",
    airbag: "Bien",
    manijas_chapas: "Bien",
    puertas_seguros: "Bien",
    eleva_vidrios: "Bien",
    sillas_cojineria: "Bien",
    latoneria_y_pintura: "Bien",
    estado_platon_carroceria: "Bien",
    carpas: "Bien",
    compuertas: "Bien",
    estribos: "Bien",
    sillas: "Bien",
    cojineria: "Bien",
    tapetes: "Bien",
    pernos_completos: "Bien",
    muelles_y_amortiguadores: "Bien",
    tanque_combustible: "Bien",
    tanque_aire: "Bien",
    llanta_delantera_derecha: "Bien",
    llanta_delantera_izquierda: "Bien",
    llanta_trasera_derecha: "Bien",
    llanta_trasera_izquierda: "Bien",
    llanta_repuesto: "Bien",
    kit_seguridad: "Bien",
    kit_derrames: "Bien",
    conos: "Bien",
    chaleco_reflectivo: "Bien",
    campana: "Bien",
    tanque_lixiviado: "Bien",
    rejilla: "Bien",
    manguera_lixiviado: "Bien",
    empaque_portalon: "Bien",
    cilindros_hidraulicos: "Bien",
    seguro_portalon: "Bien",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [observations, setObservations] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);


  useEffect(() => {
    return () => {
      setFormData(initialFormData);
      setObservations({});
    }
    // eslint-disable-next-line
  },[]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleObservationChange = (e) => {
    setObservations((prevObservations) => ({
      ...prevObservations,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "fecha",
      "nombre_conductor",
      "licencia",
      "seguridad_social",
      "tipo_vehiculo",
      "placa",
      "marca",
      "dependencia",
      "kilometraje",
      "soat",
      "rtm",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: "error",
          title: "Campos Requeridos Incompletos",
          text: `Por favor, complete todos los campos requeridos. Falta: ${field}.`,
        });
        return false;
      }
    }

    return true;
  };

  const generateObservations = () => {
    let newObservations = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "Mal" || formData[key] === "Regular") {
        newObservations[key] = observations[key] || "";
      }
    });

    // Actualiza el estado de observaciones con las observaciones generadas
    setObservations(newObservations);

    // Verifica si todas las observaciones necesarias están diligenciadas
    return Object.keys(newObservations).every((key) => newObservations[key]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formSubmitted);
  
    // Evitar el envío si ya se ha enviado previamente
    if (formSubmitted) return;
  
    setFormSubmitted(true);
  
    // Validar el formulario
    if (!validateForm()) {
      setFormSubmitted(false); // Reestablecer el estado en caso de validación fallida
      return;
    }
  
    // Generar observaciones
    if (!generateObservations()) {
      Swal.fire({
        icon: "error",
        title: "Diligencie las observaciones de cada item (Malo) o (Regular)",
        text: "De no hacerlo no podrá continuar con el envío.",
      });
      setFormSubmitted(false); // Reestablecer el estado en caso de no completar observaciones
      return;
    }
  
    try {
      // Llama a VerifyInspection y espera su resultado
      const response = await VerifyInspection(
        formData.fecha,
        formData.vehicle_id
      );
  
      if (response && response.message === "Inspección ya existe") {
        Swal.fire({
          icon: "warning",
          title: "Inspección Existente",
          text: "Ya hay una inspección registrada para esta fecha y vehículo.",
        });
        setFormSubmitted(false); // Reestablecer el estado si la inspección ya existe
        return; // Detener el envío si existe una inspección
      }
  
      const inspectionData = {
        driver_id: formData.driver_id,
        vehicle_id: formData.vehicle_id,
        mileage: formData.kilometraje,
      };
  
      const inspection_id = await NewInspection(inspectionData);
      formData.inspection_id = inspection_id;
  
      // Construir el array de inspecciones
      const inspections = [];
      Object.keys(formData).forEach((key) => {
        if (
          !["fecha", "driver_id", "vehicle_id", "inspection_id"].includes(key)
        ) {
          inspections.push({
            inspection_id: formData.inspection_id.inspection_id,
            name_condition: key,
            conditions: formData[key],
            comment: observations[key] || "",
          });
        }
      });
  
      const reports = []; // Variable para almacenar los resultados
  
      // Mapeamos sobre las inspecciones y generamos las promesas
      const promises = inspections.map(async (inspection) => {
        // Solo procesamos inspecciones que están marcadas como "Mal"
        if (inspection.conditions === "Mal") {
          try {
            // Llamamos a la función de mantenimiento
            const result = await CreateMaintenance(
              formData.placa,
              formData.inspection_id.inspection_id, // Asegúrate de que inspection_id está correctamente estructurado
              formData.nombre_conductor,
              inspection.name_condition,
              observations[inspection.name_condition] || "" // Agrega observaciones si las hay
            );
  
            reports.push(result); // Añadimos el resultado a reports si la inspección es "Mal"
          } catch (error) {
            console.error("Error al crear mantenimiento:", error);
            // Manejo de errores si ocurre
          }
        }
      });
  
      await Promise.all(promises); // Asegúrate de esperar todas las promesas
  
      // Verificamos si se generaron reportes malos antes de enviar el correo
      if (reports.length > 0) {
        // Llamamos a la función SendReport pasándole formData y la cantidad de reports
        await SendReport({
          ...formData, // Pasamos todos los datos del formulario
          reports: reports.length, // Incluimos los reports
        });
      } else {
        console.log("No se generaron reportes malos, no se enviará el correo.");
      }
  
      await NewVehicleCondition({ inspections });
      Swal.fire({
        icon: "success",
        title: "Formulario Enviado",
        text: "El formulario se ha enviado con éxito.",
      });
  
      setFormData(initialFormData); // Resetea el formulario a su estado inicial
      setObservations({}); // Limpia las observaciones
      setFormSubmitted(false); // Permitir que se envíe el formulario nuevamente
    } catch (error) {
      console.error("Error en el envío de la inspección:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al enviar la inspección: ${error.message}`,
      });
      setFormSubmitted(false); // Reestablecer el estado en caso de error
    }
  };
  


  return (
    <div className="container mx-auto px-6 py-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Container
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleObservationChange={handleObservationChange}
        />
        <Comments
          observations={observations}
          handleObservationChange={handleObservationChange}
        />
        <div className="flex justify-end">
          <button
          onClick={onsubmit}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-3 text-center transition-all duration-300 ease-in-out"
          >
            <svg
              className="w-5 h-5 mr-2 inline-block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="#ffffff"
                d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              />
            </svg>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default InspectionForm;
