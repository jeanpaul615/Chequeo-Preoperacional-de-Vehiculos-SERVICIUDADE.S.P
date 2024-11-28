import React, { useState } from "react";
import Container from "./Container";
import Swal from "sweetalert2";
import Comments from "./Comments";
import {
  NewInspection,
  NewVehicleCondition,
} from "../../../../controllers/Inspection/InspectionControllers/NewInspection";
import { VerifyInspection } from "../../../../controllers/Inspection/InspectionControllers/VerifyInspection";
import {CreateMaintenance} from "../../../../controllers/Inspection/MaintenanceControllers/CreateMaintenance";
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
    casco: "Bien",
    guantes: "Bien" ,
    rodilleras: "Bien",
    coderas: "Bien",
    calzado_antideslizante: "Bien",
    equipo_de_lluvia: "Bien",
    nivel_de_aceite: "Bien",
    horquilla: "Bien",
    amortiguadores: "Bien",
    centro_de_direccion: "Bien",
    guaya_frenos_aceleracion: "Bien",
    guaya_de_embrague: "Bien",
    cojineria: "Bien",
    guardabarras: "Bien",
    soporte: "Bien",
    baul: "Bien",
    tubo_escape: "Bien",
    labrado_llantas: "Bien",
    presion_inflado: "Bien",
    perfil_llantas: "Bien",
    estado_estructural_rin: "Bien",
    nivel_de_liquidos: "Bien",
    discos: "Bien",
    pastillas: "Bien",
    recorrido_del_pedal: "Bien",
    graduacion_del_conjunto: "Bien",
    limpieza_y_lubricacion: "Bien",
    tension: "Bien",
    desgaste: "Bien",
    tablero_de_instrumentos: "Bien",
    pito: "Bien",
    luces_direccionales: "Bien",
    limpieza: "Bien",
    fijaciono: "Bien",
    estado: "Bien",

    
  };

  const [formData, setFormData] = useState(initialFormData);
  const [observations, setObservations] = useState({});

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
    // Validar el formulario
    if (!validateForm()) return;

    // Generar observaciones
    if (!generateObservations()) {
      Swal.fire({
        icon: "error",
        title: "Diligencie las observaciones de cada item (Malo) o (Regular).",
        text: "De no hacerlo no podrá continuar con el envío.",
      });
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
    } catch (error) {
      console.error("Error en el envío de la inspección:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al enviar la inspección: ${error.message}`,
      });
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
            type="submit"
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
