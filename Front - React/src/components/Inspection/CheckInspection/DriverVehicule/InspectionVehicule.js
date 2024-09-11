import { useEffect, useState } from "react";
import React from "react";
import { GetVehicles } from "../../../../controllers/Inspection/DashboardControllers/Vehicle";
import { VehiclebyPlate } from "../../../../controllers/Inspection/VehicleControllers/VehicleByPlate";

const InspectionVehicule = ({ formData, setFormData, handleChange }) => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // UseEffect para traer la autocompletación de los otros campos basado en la placa
  useEffect(() => {
    const fetchLicense = async () => {
      if (formData.placa) {
        try {
          const data = await VehiclebyPlate(formData.placa);
          setFormData((prevData) => ({
            ...prevData,
            marca: data.marca,
            dependencia: data.dependencia,
            kilometraje: data.kilometraje,
            soat: data.soat,
            rtm: data.rtm,
            seguro_contractual: data.seguro_contractual,
            seguro_extracontractual: data.seguro_extracontractual,
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchLicense();
  }, [formData.placa, setFormData]);

  // UseEffect para traer los datos de los vehículos
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await GetVehicles();
        setVehicles(data); // Assuming `data` is an array of vehicles
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <fieldset className="p-5 border rounded-lg shadow-md">
      <h1 className="text-normal font-bold normal">Datos del Vehículo</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Tipo de Vehículo */}
        <div className="">
          <label
            htmlFor="tipo_vehiculo"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Tipo de Vehículo:
          </label>
          <select
            id="tipo_vehiculo"
            name="tipo_vehiculo"
            value={formData.tipo_vehiculo}
            onChange={handleChange}
            className="bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          >
            <option value="">Seleccione el vehículo</option>
            <option value="RECOLECTOR">Recolector</option>
            <option value="VOLQUETA">Volqueta</option>
            <option value="CAMIONETA">Camioneta</option>
            <option value="MOTO">Moto</option>
          </select>
        </div>

        {/* Placa */}
        <div>
          <label
            htmlFor="placa"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Placa:
          </label>
          <input
            type="text"
            placeholder="Buscar placa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 mb-2 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
          />
          <select
            id="placa"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          >
            <option value="">Seleccionar Placa</option>
            {filteredVehicles.map((vehicle) => (
              <option key={vehicle.vehicle_id} value={vehicle.license_plate}>
                {vehicle.license_plate}
              </option>
            ))}
          </select>
        </div>

        {/* Marca */}
        <div className="">
          <label
            htmlFor="marca"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Marca:
          </label>
          <input
            type="text"
            id="marca"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className="bg-gray-50 font-medium border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          />
        </div>

        {/* Dependencia */}
        <div className="">
          <label
            htmlFor="dependencia"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Dependencia:
          </label>
          <select
            id="dependencia"
            name="dependencia"
            value={formData.dependencia}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          >
            <option value="">Seleccione la Dependencia</option>
            <option value="ACUEDUCTO">Acueducto</option>
            <option value="ALCANTARILLADO">Alcantarillado</option>
            <option value="ASEO">Aseo</option>
          </select>
        </div>

        {/* Kilometraje */}
        <div className="">
          <label
            htmlFor="kilometraje"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Kilometraje:
          </label>
          <input
            type="number"
            id="kilometraje"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          />
        </div>

        {/* SOAT */}
        <div className="">
          <label
            htmlFor="soat"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            SOAT:
          </label>
          <input
            type="text"
            id="soat"
            name="soat"
            value={formData.soat}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          />
        </div>

        {/* RTM */}
        <div className="">
          <label
            htmlFor="rtm"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            RTM:
          </label>
          <input
            type="text"
            id="rtm"
            name="rtm"
            value={formData.rtm}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          />
        </div>

        {/* Seguro Contractual */}
        <div className="">
          <label
            htmlFor="seguro_contractual"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Seguro Contractual:
          </label>
          <input
            type="text"
            id="seguro_contractual"
            name="seguro_contractual"
            value={formData.seguro_contractual}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          />
        </div>

        {/* Seguro Extracontractual */}
        <div className="">
          <label
            htmlFor="seguro_extracontractual"
            className="block text-sm font-medium text-gray-900 dark:text-black"
          >
            Seguro Extracontractual:
          </label>
          <input
            type="text"
            id="seguro_extracontractual"
            name="seguro_extracontractual"
            value={formData.seguro_extracontractual}
            onChange={handleChange}
            className="font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
            required
          />
        </div>
      </div>
    </fieldset>
  );
};


export default InspectionVehicule;
