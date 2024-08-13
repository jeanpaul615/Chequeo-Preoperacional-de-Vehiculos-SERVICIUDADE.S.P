import React, { useState } from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionLlantas({ formData, handleChange }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { label: "Delantera Derecha", name: "llanta_delantera_derecha" },
    { label: "Delantera Izquierda", name: "llanta_delantera_izquierda" },
    { label: "Trasera Derecha", name: "llanta_trasera_derecha" },
    { label: "Trasera Izquierda", name: "llanta_trasera_izquierda" },
    { label: "Llanta Repuesto", name: "llanta_repuesto" }
  ];

  const handleItemClick = (itemName) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  return (
    <div className="flex-1 max-w-4xl mb-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="pb-5 text-xlxl font-bold text-gray-800">Llantas</h1>
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
