import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css"; // Tema base
import "primereact/resources/primereact.min.css"; // Estilos básicos de PrimeReact
import { locale, addLocale } from "primereact/api";
import { GetInspectionDates } from "../../../controllers/Inspection/InspectionControllers/GetInspectiondDate";

locale("es");

const ModalCalendar = ({ isOpen, onClose, vehicle }) => {
  const [date, setDate] = useState(null);
  const [inspectionDates, setInspectionDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetInspectionDates(vehicle.vehicle_id);
        console.log(data.data);
        
        // Formatear las fechas para que puedan ser utilizadas en el calendario
        const formattedDates = data.data.map(item => {
          const parts = item.created_at.split('/');
          const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]); // Convierte a formato Date
          return formattedDate;
        });

        setInspectionDates(formattedDates);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [vehicle]);

  // Custom dateTemplate function
  const dateTemplate = (date) => {
    const isInspectionDate = inspectionDates.some(
      inspectionDate => 
        inspectionDate.getDate() === date.day && 
        inspectionDate.getMonth() === date.month &&
        inspectionDate.getFullYear() === date.year
    );

    return (
      <div className="p-2" style={{ position: 'relative' }}>
        {date.day}
        {isInspectionDate && (
          <span
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              backgroundColor: 'green', // Color del punto
              borderRadius: '50%',
            }}
          />
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  addLocale("es", {
    firstDayOfWeek: 1,
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rounded-xl w-full"
        initial={{ y: "-50vh" }}
        animate={{ y: "0" }}
        exit={{ y: "50vh" }}
      >
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-auto relative">
            {/* Header */}
            <div className="flex flex-col items-center mb-6 space-y-4">
              <h1 className="text-3xl font-semibold text-blue-600">{vehicle.license_plate}</h1>
              <h2 className="text-xl font-medium text-gray-800 text-center">
                Calendario de Inspecciones
              </h2>

              {/* Close button */}
              <button
                onClick={onClose}
                type="button"
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 bg-transparent hover:bg-gray-200 rounded-full text-lg p-2 transition-all duration-200"
                data-modal-hide="default-modal"
              >
                <span className="sr-only">Cerrar modal</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Calendar */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner w-full">
              <Calendar
                value={date}
                onChange={(e) => setDate(e.value)}
                inline
                className="rounded-lg shadow-sm p-2 w-full"
                dateTemplate={dateTemplate} // Usamos la función personalizada para el template
              />
              {/* Leyenda en la parte inferior */}
              <div className="text-sm text-center mt-4">
                <span className="inline-block w-3 h-3 rounded-full bg-green-700 mr-2"></span>
                <span>Día de Inspección Realizada</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalCalendar;
