import React, { useState } from "react";
import Container from "./Container";
import Swal from "sweetalert2";

/**
 * Componente de formulario de inspección.
 * Este componente renderiza un formulario de inspección con una serie de campos predefinidos.
 * Los datos del formulario se manejan mediante el estado local y se envían a un contenedor para su gestión.
 */
const InspectionForm = () => {
  /**
   * Estado inicial del formulario con todos los campos establecidos en "Bien".
   * @type {Object}
   */
  const initialFormData = {
    fecha: "",
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
    seguro_contractual: "",
    seguro_extracontractual: "",
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

  // Estado del formulario
  const [formData, setFormData] = useState(initialFormData);

  /**
   * Maneja el cambio de los campos del formulario.
   * Actualiza el estado del formulario con el valor del campo modificado.
   * @param {Event} e - El evento de cambio del campo del formulario.
   */
  const handleChange = (e) => {
    // Verifica si el parámetro es un arreglo
    if (Array.isArray(e)) {
        // Si es un arreglo, procesa cada elemento
        e.forEach(item => {
            setFormData(prevFormData => ({
                ...prevFormData,
                [item.target.name]: item.target.value,
            }));
        });
    } else {
        // Si no es un arreglo, procesa un solo objeto
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    }
};

  

  /**
   * Valida los campos requeridos del formulario.
   * Verifica si algún campo esencial está vacío.
   * @returns {boolean} - Devuelve true si todos los campos requeridos están completos, de lo contrario, false.
   */
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
      "seguro_contractual",
      "seguro_extracontractual",
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

  /**
   * Maneja el envío del formulario.
   * Prevé el comportamiento por defecto del formulario.
   * @param {Event} e - El evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Puedes agregar aquí el código para enviar los datos a una API o realizar otras acciones necesarias
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        {/* Renderiza el contenedor que maneja la visualización del formulario */}
        <Container formData={formData} setFormData={setFormData} handleChange={handleChange} />
        <button
          type="submit"
          className="md:ml-80 mt-4 p-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default InspectionForm;
