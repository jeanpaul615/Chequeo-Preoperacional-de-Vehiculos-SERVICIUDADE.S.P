import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionEstadoConductor({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Estado Conductor</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InspectionSelect
          label="Prueba de Embriaguez"
          name="pruebaEmbriaguez"
          value={formData.pruebaEmbriaguez}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Estado de Salud Conductor"
          name="estadoSaludConductor"
          value={formData.estadoSaludConductor}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
