import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionInstrumentos({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Instrumentos</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InspectionSelect
          label="presionaire"
          name="presionaire"
          value={formData.presionaire}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="lubricacion"
          name="lubricacion"
          value={formData.lubricacion}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="paneldecontrol"
          name="paneldecontrol"
          value={formData.paneldecontrol}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="niveldecombustibles"
          name="niveldecombustibles"
          value={formData.niveldecombustibles}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Carga Batería"
          name="cargabateria"
          value={formData.cargabateria}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Temperatura Motor"
          name="temperaturamotor"
          value={formData.temperaturamotor}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Tacómetro - Velocímetro"
          name="tacometrovelocimetro"
          value={formData.tacometrovelocimetro}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
