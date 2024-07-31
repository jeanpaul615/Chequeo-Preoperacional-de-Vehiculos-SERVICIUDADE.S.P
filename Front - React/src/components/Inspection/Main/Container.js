import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../../containers/Sidebar";
import InspectionCompactador from "../EstadoV2/InspectionCompactador";
import InspectionInstrumentos from "../EstadoV2/InspectionInstrumentos";
import InspectionLlantas from "../EstadoV2/InspectionLlantas";
import InspectionNiveles from "../EstadoV3/InspectionNiveles";
import InspectionOtros from "../EstadoV3/InspectionOtros";
import InspectionVial from "../EstadoV3/InspectionVial";
import InspectionVidrios from "../EstadoV1/InspectionVidrios";
import InspectionRevisionInterna from "../EstadoV1/InspectionRevisionInterna";
import InspectionLuces from "../EstadoV1/InspectionLuces";
import InspectionVehicule from "../DriverVehicule/InspectionVehicule";
import InspectionDriver from "../DriverVehicule/InspectionDriver";
import Navbar from "../../../containers/Navbar";
// Importación de imágenes
import Conductor from "../../../assets/conductor2.jpg";
import Luces from "../../../assets/lucesvidrios.jpg";
import Llantas from "../../../assets/llantas.jpg";
import Vial from "../../../assets/kitseguridad.jpg";
import Swal from "sweetalert2";

// Define paths para las imágenes usadas en los grupos de componentes
const images = {
  vehiculeDriver: Conductor,
  estadoV1: Luces,
  estadoV2: Llantas,
  estadoV3: Vial,
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
    title: "Vidrios, Revisión Interna y Luces",
    image: images.estadoV1,
    components: [
      { id: "vidrios", component: InspectionVidrios },
      { id: "revisionInterna", component: InspectionRevisionInterna },
      { id: "luces", component: InspectionLuces },
    ],
  },
  {
    id: "estadoV2",
    title: "Compactador, Instrumentos y Llantas",
    image: images.estadoV2,
    components: [
      { id: "compactador", component: InspectionCompactador },
      { id: "instrumentos", component: InspectionInstrumentos },
      { id: "llantas", component: InspectionLlantas },
    ],
  },
  {
    id: "estadoV3",
    title: "Niveles, Vial y Otros",
    image: images.estadoV3,
    components: [
      { id: "niveles", component: InspectionNiveles },
      { id: "otros", component: InspectionOtros },
      { id: "vial", component: InspectionVial },
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
    console.log("Form data saved:", formData);
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
      }
    });
    Toast.fire({
      icon: "success",
      title: "Sección Guardada Correctamente!"
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
        <Navbar Title="Inspección Preoperacional" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {componentGroups.map((group) => (
            <motion.div
              key={group.id}
              layoutId={group.id}
              onClick={() => setSelectedGroupId(group.id)}
              className="relative cursor-pointer p-4 border rounded-lg shadow-lg bg-white hover:bg-gray-100 flex items-center overflow-hidden"
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
              <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
                <motion.h3
                  className="text-lg md:text-xl font-bold text-white bg-black bg-opacity-60 p-2 rounded-lg shadow-md"
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
              className="bg-white rounded-lg shadow-xl w-full sm:w-11/12 md:w-2/3 lg:w-1/2 p-6 relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="space-y-4">
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
              <div className="flex justify-end mt-2 rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-blue-500 border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  Siguiente
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-green-500 border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-red-500 border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
