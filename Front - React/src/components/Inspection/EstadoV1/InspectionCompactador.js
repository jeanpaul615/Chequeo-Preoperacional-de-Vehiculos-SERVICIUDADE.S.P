import React from "react";
import InspectionSelect from "../Main/InspectionSelect"; // Asegúrate de que la ruta sea correcta

export default function InspectionCompactador({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Compactador</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InspectionSelect
          label="Tanque de Lixiviado"
          name="tanquelixiviado"
          value={formData.tanquelixiviado}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Rejilla"
          name="rejilla"
          value={formData.rejilla}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Manguera de Lixiviado"
          name="mangueraLixiviado"
          value={formData.mangueraLixiviado}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Empaque de Portalón"
          name="empaquePortalon"
          value={formData.empaquePortalon}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Cilindros Hidráulicos"
          name="cilindrosHidraulicos"
          value={formData.cilindrosHidraulicos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Seguro de Portalón"
          name="seguroPortalon"
          value={formData.seguroPortalon}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
