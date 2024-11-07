import { useEffect, useState } from "react";
import React from "react";
import { GetUserById } from "../../../../controllers/Inspection/DriversControllers/GetDriver";
import { DriverbyName } from "../../../../controllers/Inspection/DriversControllers/DriverbyName";

const today = new Date().toISOString().split("T")[0];
const user_id = sessionStorage.getItem('user_id');


const InspectionDriver = ({ formData, handleChange }) => {
  const [drivers, setDrivers] = useState([]);
  const [licenseUntil, setLicenseUntil] = useState(""); // Cambiar el nombre a licenseUntil
//Trae los datos de la API 
  useEffect(() => {
    const fetchLicense = async () => {
      if (formData.nombre_conductor) {
        try {
          const data = await DriverbyName(formData.nombre_conductor);
          if (data && data.result && data.result.length > 0) {
            const licenseDate = data.result[0].license_until.split("T")[0]; // Extraer solo la parte de la fecha
            setLicenseUntil(licenseDate);
            handleChange({
              target: {
                name: "licencia", // Nombre del campo para actualizar el formulario
                value: licenseDate,
              },
            });
            handleChange({
              target: { name: "fecha", value: today },
            });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchLicense();
    // eslint-disable-next-line
  }, [formData.nombre_conductor]);
//Filtra los datos de la inspeccion basado en el nombre
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const data = await GetUserById();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDrivers();
    // eslint-disable-next-line
  }, []);


  return (
    <div className="text-flex flex-col md:flex-row md:justify-center p-4">
      <fieldset className="flex-1 max-w-4xl mb-6 p-8 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-xlxl font-bold text-gray-800">
          Datos del Conductor
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fecha"
              className="block text-sm font-medium text-gray-900 dark:text-black"
            >
              Fecha(*):
            </label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha || today}
              onChange={handleChange}
              className="bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required
              readOnly
            />
          </div>

          {/* Buscador de conductores */}
          <div>
            <label
              htmlFor="nombre_conductor"
              className="block text-sm font-medium text-gray-900 dark:text-black"
            >
              Nombre del Conductor(*):
            </label>
            <select
              id="nombre_conductor"
              name="nombre_conductor"
              value={formData.nombre_conductor}
              onChange={(e) => {
                const selectedDriver = drivers.find(
                  (driver) => driver.driver_name === e.target.value
                );
                handleChange(e); // Update the nombre_conductor field
                if (selectedDriver) {
                  // Update formData.driver_id with the selected driver's user_id
                  handleChange({
                    target: { name: "driver_id", value: selectedDriver.driver_id },
                  });
                }
              }}
              className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
              required
            >
              <option value="">Seleccionar Conductor</option>
              {drivers.map((driver) => (
                <option key={user_id} value={driver.driver_name}>
                  {driver.driver_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="licencia"
              className="block text-sm font-medium text-gray-900 dark:text-black"
            >
              Licencia de Conducción(*):
            </label>
            <input
              type="text"
              id="licencia"
              name="licencia"
              value={formData.licencia || licenseUntil} // Muestra el valor de licenciaUntil
              onChange={handleChange}
              className="block text-sm font-medium text-gray-900 dark:text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2"
              required
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="seguridad_social"
              className="block text-sm font-medium text-black"
            >
              Seguridad Social(*):
            </label>
            <select
              id="seguridad_social"
              name="seguridad_social"
              value={formData.seguridad_social}
              onChange={handleChange}
              className="block text-sm font-medium text-gray-900 dark:text-black bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2"
              required
            >
              <option value="">¿Cuenta con seguridad social?</option>
              <option value={today}>Sí</option>
              <option value={today}>No</option>
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default InspectionDriver;
