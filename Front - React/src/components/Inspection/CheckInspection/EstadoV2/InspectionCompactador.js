import React, { useState } from "react";
import InspectionSelect from "../Main/InspectionSelect"; // Ensure the path is correct

export default function InspectionCompactador({ formData, handleChange }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { label: "Tanque de Lixiviado", name: "tanque_lixiviado" },
    { label: "Rejilla", name: "rejilla" },
    { label: "Manguera de Lixiviado", name: "manguera_lixiviado" },
    { label: "Empaque de Portalón", name: "empaque_portalon" },
    { label: "Cilindros Hidráulicos", name: "cilindros_hidraulicos" },
    { label: "Seguro de Portalón", name: "seguro_portalon" }
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
