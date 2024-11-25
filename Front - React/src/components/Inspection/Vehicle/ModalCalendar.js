import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const ModalCalendar = ({ isOpen, onClose, events }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md shadow-md w-11/12 md:w-1/2 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Calendario de Inspecciones
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md text-sm"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          locale="es"
          height="auto"
          contentHeight="auto"
        />
      </div>
    </div>
  );
};

export default ModalCalendar;
