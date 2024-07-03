import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionLlantas({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Llantas</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InspectionSelect
          label="Delantera Derecha"
          name="llantaDelanteraDerecha"
          value={formData.llantaDelanteraDerecha}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Delantera Izquierda"
          name="llantaDelanteraIzquierda"
          value={formData.llantaDelanteraIzquierda}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Trasera Derecha"
          name="llantaTraseraDerecha"
          value={formData.llantaTraseraDerecha}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Trasera Izquierda"
          name="llantaTraseraIzquierda"
          value={formData.llantaTraseraIzquierda}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Llanta Repuesto"
          name="llantaRepuesto"
          value={formData.llantaRepuesto}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
