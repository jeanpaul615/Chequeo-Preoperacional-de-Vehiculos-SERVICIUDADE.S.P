import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionVial({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Vial</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InspectionSelect
          label="Kit de Seguridad"
          name="kitSeguridad"
          value={formData.kitSeguridad}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Kit de Derrames"
          name="kitDerrames"
          value={formData.kitDerrames}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Conos"
          name="conos"
          value={formData.conos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Chaleco Reflectivo"
          name="chalecoReflectivo"
          value={formData.chalecoReflectivo}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Campana"
          name="campana"
          value={formData.campana}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
