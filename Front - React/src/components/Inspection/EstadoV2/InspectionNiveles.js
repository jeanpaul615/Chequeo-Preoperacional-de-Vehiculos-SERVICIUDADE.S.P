import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionNiveles ({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Niveles del Vehículo</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InspectionSelect
          label="aceitemotor"
          name="aceitemotor"
          value={formData.aceitemotor}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="aceitehidraulico"
          name="aceitehidraulico"
          value={formData.aceitehidraulico}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="liquidodefrenos"
          name="liquidodefrenos"
          value={formData.liquidodefrenos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="refrigerante"
          name="refrigerante"
          value={formData.refrigerante}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Agua Parabrisas"
          name="aguaparabrisas"
          value={formData.aguaparabrisas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Nivel Combustible"
          name="nivelcombustible"
          value={formData.nivelcombustible}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
};

