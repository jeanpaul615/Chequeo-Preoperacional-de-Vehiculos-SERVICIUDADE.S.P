import React, { useState } from "react";
import InspectionSelect from "../Main/InspectionSelect"; // Ensure the path is correct

export default function InspectionSistemadeSuspension({ formData, handleChange }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { label: "Horquilla", name: "horquilla" },
    { label: "Amortiguadores", name: "amortiguadores" },
    { label: "Centro de Dirección", name: "centro_de_direccion" },
    { label: "Guaya Frenos - Aceleración", name: "guaya_frenos_aceleracion" },
    { label: "Guaya de Embrague", name: "guaya_de_embrague" },
    { label: "Cojineria", name: "cojineria" },
    { label: "Guardabarros", name: "guardabarros" },
    { label: "Soporte", name: "soporte" },
    { label: "Baul", name: "baul" },
    { label: "Tubo de Escape", name: "tubo_de_escape" }


  ];

  const handleItemClick = (itemName) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  return (
    <div className="flex-1 max-w-4xl mb-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="pb-5 text-xlxl font-bold text-gray-800">Compactador</h1>
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
