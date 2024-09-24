import React, { useState } from "react";
import Container from "./Container";
import Swal from "sweetalert2";
import Comments from "./Comments";
import { NewInspection, NewVehicleCondition } from "../../../../controllers/Inspection/InspectionControllers/NewInspection";

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
    vehicle_id:"",
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
      if (formData[key] === "Mal") {
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
    if (validateForm()) {
      if (generateObservations()) {
        try {
          const inspectionData = {
            driver_id: formData.driver_id, // Asegúrate de ajustar esto según tu lógica
            vehicle_id: formData.vehicle_id, // Cambia esto según tus necesidades
            mileage: formData.kilometraje,
            // Agrega más campos según tu modelo de datos
          };
  
          const inspection_id = await NewInspection(inspectionData);
          formData.inspection_id = inspection_id;
          await NewVehicleCondition({
            inspection_id: formData.inspection_id.inspection_id, // Id de la inspección
            conditions: JSON.stringify(formData), // Los datos del formulario relacionados con las condiciones del vehículo
            comment: Object.values(observations).join(' ') // Unifica los comentarios en un string
          });
          Swal.fire({
            icon: "success",
            title: "Formulario Enviado",
            text: "El formulario se ha enviado con éxito.",
          });
          setFormData([]);
          setObservations({});
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error al enviar la inspección: ${error.message}`,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Diligencie las observaciones de cada item (Malo)",
          text: "De no hacerlo no podrá continuar con el envío.",
        });
      }
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
              viewBox="0 0 512 512"
            >
              <path
                fill="#ffffff"
                d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"
              />
            </svg>
            Enviar Chequeo
          </button>
        </div>
      </form>
    </div>
  );
};

export default InspectionForm;
