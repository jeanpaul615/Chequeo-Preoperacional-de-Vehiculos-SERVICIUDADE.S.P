import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionRevisionInterna({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Revisión Interna</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InspectionSelect
          label="Tablero y Testigos"
          name="tableroytestigos"
          value={formData.tableroytestigos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Freno de Seguridad"
          name="frenodeseguridad"
          value={formData.frenodeseguridad}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Alarma de Reversa"
          name="alarmadereversa"
          value={formData.alarmadereversa}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Cinturón de Seguridad"
          name="cinturondeseguridad"
          value={formData.cinturondeseguridad}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Bocina"
          name="bocina"
          value={formData.bocina}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Apoya Cabezas"
          name="apoyacabezas"
          value={formData.apoyacabezas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Airbag"
          name="airbag"
          value={formData.airbag}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Manijas/Chapas"
          name="manijasChapas"
          value={formData.manijasChapas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Puertas/Seguros"
          name="puertasSeguros"
          value={formData.puertasSeguros}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Elevavidrios"
          name="elevavidrios"
          value={formData.elevavidrios}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Sillas o Cojinería"
          name="sillasCojineria"
          value={formData.sillasCojineria}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
