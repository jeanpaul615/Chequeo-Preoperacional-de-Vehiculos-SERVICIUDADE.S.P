import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../../../containers/Sidebar";
import InspectionElementosProteccionPersonal from "../EstadoV1/InspectionElementosProteccionPersonal";
import InspectionMotor from "../EstadoV1/InspectionMotor";
import InspectionLlantas from "../EstadoV2/InspectionLlantas";
import InspectionSistemadeSuspension from "../EstadoV2/InspectionSistemadeSuspension";
import InspectionSistemadeFrenos from "../EstadoV3/InspectionSistemadeFrenos";
import InspectionSistemadeTransmision from "../EstadoV3/InspectionSistemadeTransmision";
import InspectionSistemaElectrico from "../EstadoV3/InspectionSistemaElectrico";
import InspectionVidriosyEspejos from "../EstadoV3/InspectionVidriosyEspejos";
import InspectionVehicule from "../../CheckInspection/DriverVehicule/InspectionVehicule";
import InspectionDriver from "../../CheckInspection/DriverVehicule/InspectionDriver";
import Navbar from "../../../../containers/Navbar";
// Importación de imágenes
//import Conductor from "../../../../assets/CheckInspection/moto.png";
import Moto from "../../../../assets/CheckInspection/motos_img1.jpg"
import EPP from "../../../../assets/CheckInspection/EPP.jpg";
//import Luces from "../../../../assets/CheckInspection/proteccionpersonal.png";
import Suspension from "../../../../assets/CheckInspection/Suspension.jpg";
import Vidrios from "../../../../assets/CheckInspection/vidrios.jpg";
import Swal from "sweetalert2";

// Define paths para las imágenes usadas en los grupos de componentes
const images = {
  vehiculeDriver: Moto,
  estadoV1: EPP,
  estadoV2: Suspension,
  estadoV3: Vidrios
};

// Define los grupos de componentes para la inspección
const componentGroups = [
  {
    id: "vehiculeDriver",
    title: "Datos del Vehículo y Conductor",
    image: images.vehiculeDriver,
    components: [
      { id: "driver", component: InspectionDriver },
      { id: "vehicule", component: InspectionVehicule },
    ],
  },
  {
    id: "estadoV1",
    title: "Elementos de Protección Personal y Motor",
    image: images.estadoV1,
    components: [
      { id: "Elementos Proteccion Personal", component: InspectionElementosProteccionPersonal },
      { id: "Motor", component: InspectionMotor },
    ],
  },
  {
    id: "estadoV2",
    title: "LLantas y Sistema de Suspensión",
    image: images.estadoV2,
    components: [
      { id: "Llantas", component: InspectionLlantas },
      { id: "Sistema De Suspension", component: InspectionSistemadeSuspension },
    ],
  },
  {
    id: "estadoV3",
    title: "Frenos, Transmisión, Electrico y Vidrios y Espejos",
    image: images.estadoV3,
    components: [
      { id: "Frenos", component: InspectionSistemadeFrenos },
      { id: "Sistema de Transimisión", component: InspectionSistemadeTransmision },
      { id: "Sistema Electrico", component: InspectionSistemaElectrico },
      { id: "Vidrios y Espejos", component: InspectionVidriosyEspejos },
    ],
  },

];

/**
 * ContainerInspection es un componente principal que organiza y muestra los componentes de inspección
 * según el grupo seleccionado. Utiliza framer-motion para animaciones y Tailwind CSS para el diseño.
 *
 * @param {Object} props - Props del componente.
 * @param {Object} props.formData - Datos del formulario.
 * @param {Function} props.handleChange - Función para manejar cambios en el formulario.
 * @returns {JSX.Element} - Renderiza el contenedor de inspección.
 */
export default function ContainerInspection({ formData, handleChange }) {
  // Estado para manejar el grupo de componentes seleccionado
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  /**
   * Maneja la selección del siguiente grupo de componentes en el ciclo.
   */
  const handleNext = () => {
    const currentIndex = componentGroups.findIndex(
      (group) => group.id === selectedGroupId
    );
    const nextGroup =
      componentGroups[(currentIndex + 1) % componentGroups.length];
    setSelectedGroupId(nextGroup.id);
  };

  /**
   * Maneja la lógica de guardado de los datos del formulario.
   * Actualmente, solo imprime los datos en la consola.
   */
  const handleSave = () => {
    setSelectedGroupId(null);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Sección Guardada Correctamente!",
    });
  };

  /**
   * Cierra el grupo de componentes actualmente seleccionado.
   */
  const handleClose = () => {
    setSelectedGroupId(null);
  };

  return (
    <div className="md:pl-36 flex flex-col md:flex-row">
      {/* Barra lateral oculta en dispositivos móviles */}
      <Sidebar className="hidden md:block lg:w-1/5" />

      <div className="md:ml-36 flex-1 p-4 md:pl-1/4 lg:pl-1/5">
        {/* Navbar superior */}
        <Navbar Title="Inspección Preoperacional MOTOS" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {componentGroups.map((group) => (
            <motion.div
              key={group.id}
              layoutId={group.id}
              onClick={() => setSelectedGroupId(group.id)}
              className="relative cursor-pointer p-12 border rounded-lg shadow-lg bg-white hover:bg-gray-100 flex items-center overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={group.image}
                  alt={group.title}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ filter: "brightness(1.1) contrast(1.2)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-30"></div>
              </div>
              <div className="relative z-10 flex items-center justify-center w-full h-full p-12">
                <motion.h3
                  className="text-lg md:text-xl font-normal text-white bg-black bg-opacity-60 p-2 rounded-lg shadow-md"
                  whileHover={{ scale: 1.1, color: "#E85120" }} // Cambia el color en hover
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {group.title}
                </motion.h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal para mostrar el contenido del grupo seleccionado */}
      <AnimatePresence>
        {selectedGroupId && (
          <motion.div
            layoutId={selectedGroupId}
            className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full sm:w-11/12 md:w-2/3 lg:w-1/2 p-6
               relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="space-y-4 mt-8">
                {/* Renderiza los componentes del grupo seleccionado */}
                {componentGroups
                  .find((group) => group.id === selectedGroupId)
                  .components.map(({ id, component: Component }) => (
                    <Component
                      key={id}
                      formData={formData}
                      handleChange={handleChange}
                    />
                  ))}
              </div>
              <div
                className="flex justify-end mt-4 rounded-md shadow-sm"
                role="group"
              >
                <button
                  onClick={handleSave}
                  type="button"
                  className="text-white bg-[#0e7424] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
                >
                  <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      fill="#ffffff"
                      d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                    />
                  </svg>
                  Guardado Parcial
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  className="text-white bg-[#4e84f8] focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 hover:bg-[#050708]/30 me-2 mb-2"
                >
                  Siguiente
                  <svg
                    className="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
