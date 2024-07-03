import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionVidrios({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Vidrios</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InspectionSelect
          label="Parabrisas"
          name="parabrisas"
          value={formData.parabrisas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="LimpiaParabrisas"
          name="limpiaparabrisas"
          value={formData.limpiaparabrisas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Laterales"
          name="laterales"
          value={formData.laterales}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="vidriotrasero"
          name="vidriotrasero"
          value={formData.vidriotrasero}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="limpiaparabrisastrasero"
          name="limpiaparabrisastrasero"
          value={formData.limpiaparabrisastrasero}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="espejoretrovisor"
          name="espejoretrovisor"
          value={formData.espejoretrovisor}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="espejoslaterales"
          name="espejoslaterales"
          value={formData.espejoslaterales}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
};