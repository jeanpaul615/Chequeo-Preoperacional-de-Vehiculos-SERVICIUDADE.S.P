import React, { useState } from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionSistemadeFrenos ({ formData, handleChange }) {
  const [selectedItem, setSelectedItem] = useState(null);
  
  const items = [
    {label: "Nivel de Liquidos", name: "aceite_motor"},
    {label: "Discos", name:"aceite_hidraulico"},
    {label: "Pastillas", name: "liquido_de_frenos"},
    {label: "Recorrido del Pedal", name: "refrigerante"},
    {label: "Grduacion del Conjunto", name: "agua_parabrisas"}
  ];
  
  const handleItemClick = (itemName) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  return (
    <div className="flex-1 max-w-4xl mb-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="pb-5 text-xlxl font-bold text-gray-800">Niveles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.name}>
            <div
              className="cursor-pointer p-2 border rounded-lg shadow-md bg-white hover:bg-gray-100 font-medium text-sm"
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
