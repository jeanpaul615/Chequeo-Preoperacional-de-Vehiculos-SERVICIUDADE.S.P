import React, { useState } from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionInstrumentos({ formData, handleChange }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { label: "Presión Aire", name: "presion_aire" },
    { label: "Lubricación", name: "lubricacion" },
    { label: "Panel de Control", name: "panel_de_control" },
    { label: "Nivel de Combustibles", name: "nivel_de_combustibles" },
    { label: "Carga Batería", name: "carga_bateria" },
    { label: "Temperatura Motor", name: "temperatura_motor" },
    { label: "Tacómetro - Velocímetro", name: "tacometro_velocimetro" }
  ];

  const handleItemClick = (itemName) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  return (
    <div className="flex-1 max-w-4xl mb-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="pb-5 text-xlxl font-bold text-gray-800">Instrumentos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.name}>
            <div
              className="cursor-pointer p-2 border rounded-lg shadow-md bg-white hover:bg-gray-100"
              onClick={() => handleItemClick(item.name)}
            >
              {item.label}
            </div>
            {selectedItem === item.name && (
              <div className="mt-2">
                <InspectionSelect
                  label={item.label}
                  name={item.name}
                  value={formData[item.name]}
                  handleChange={handleChange}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
