import React from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionOtros({ formData, handleChange }) {
  return (
    <fieldset className="mb-4">
      <legend className="text-lg font-semibold">Otros</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <InspectionSelect
          label="Latonería y Pintura"
          name="Latoneríaypintura"
          value={formData.LatoneriayPintura}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Estado Platón y Carrocería"
          name="estadoplatónycarrocería"
          value={formData.estadoPlatonCarroceria}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Carpas"
          name="carpas"
          value={formData.carpas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Compuertas"
          name="compuertas"
          value={formData.compuertas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Estribos"
          name="estribos"
          value={formData.estribos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Sillas"
          name="sillas"
          value={formData.sillas}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Cojinería"
          name="cojinería"
          value={formData.cojinería}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Tapetes"
          name="tapetes"
          value={formData.tapetes}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Pernos Completos"
          name="pernoscompletos"
          value={formData.pernoscompletos}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Muelles y Amortiguadores"
          name="muellesyamortiguadores"
          value={formData.muellesyamortiguadores}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Tanque de Combustible"
          name="tanquecombustible"
          value={formData.tanquecombustible}
          handleChange={handleChange}
        />
        <InspectionSelect
          label="Tanque de Aire"
          name="tanqueaire"
          value={formData.tanqueaire}
          handleChange={handleChange}
        />
      </div>
    </fieldset>
  );
}
