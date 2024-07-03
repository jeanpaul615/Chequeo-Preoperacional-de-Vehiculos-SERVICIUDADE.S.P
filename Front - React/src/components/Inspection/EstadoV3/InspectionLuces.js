import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionLuces({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Luces</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InspectionSelect
          label="Bajas"
          name="bajas"
          value={formData.bajas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Plenas"
          name="plenas"
          value={formData.plenas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Direccionales"
          name="direccionales"
          value={formData.direccionales}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Cocuyos"
          name="cocuyos"
          value={formData.cocuyos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Reversa"
          name="reversa"
          value={formData.reversa}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Antiniebla"
          name="antiniebla"
          value={formData.antiniebla}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Cabina"
          name="cabina"
          value={formData.cabina}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Emergencia"
          name="emergencia"
          value={formData.emergencia}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
