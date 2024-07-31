import React,{useState} from "react";
import InspectionSelect from "../Main/InspectionSelect";

export default function InspectionRevisionInterna({ formData, handleChange }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { label: "Tablero y Testigos", name: "tablero_y_testigos" },
    { label: "Freno de Seguridad", name: "freno_de_seguridad" },
    { label: "Alarma de Reversa", name: "alarma_de_reversa" },
    { label: "Cinturón de Seguridad", name: "cinturon_de_seguridad" },
    { label: "Bocina", name: "bocina" },
    { label: "Apoya Cabezas", name: "apoya_Cabezas" },
    { label: "Airbag", name: "airbag" },
    { label: "Manijas Y Chapas", name: "manijas_chapas" },
    { label: "Puertas y Seguros", name: "puertas_seguros" },
    { label: "Elevavidrios", name: "eleva_vidrios" },
    { label: "Sillas o Cojinería", name: "sillas_cojineria" }
  ];

  
  const handleItemClick = (itemName) => {
    setSelectedItem(selectedItem === itemName ? null : itemName);
  };

  return (
    <div className="flex-1 max-w-4xl mb-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h1 className="pb-5 text-xlxl font-bold text-gray-800">Revisión Interna</h1>
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
