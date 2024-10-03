import React, { useEffect, useState } from "react";
import { GetDriverById } from "../controllers/Inspection/DriversControllers/GetDriver";

export default function AvatarUser() {
  const [driver, setDriver] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch driver information
  useEffect(() => {
    const fetchDriver = async () => {
        const response = await GetDriverById();
        if (response) {
          const driverData = response.data[0];
          localStorage.setItem("driver", JSON.stringify(driverData)); // Guarda los datos en localStorage
          setDriver(driverData);
        }
    };

    fetchDriver();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center bg-gradient-to-r from-orange-400 to-orange-600 text-white p-3 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        {/* Avatar Icon */}
        <svg
          className="w-8 h-8 text-white bg-blue-600 rounded-full p-1 transition-transform duration-200 hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 12c2.97 0 5.4-2.43 5.4-5.4S14.97 1.2 12 1.2 6.6 3.63 6.6 6.6 9.03 12 12 12zm0 1.8c-3.18 0-9.6 1.6-9.6 4.8V21h19.2v-2.4c0-3.2-6.42-4.8-9.6-4.8z" />
        </svg>

        {/* User Name */}
        <span className="ml-3 font-semibold text-sm">
          {driver.driver_name || "Nombre Desconocido"}
        </span>
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg z-10 overflow-hidden border border-gray-200">
          <div className="px-4 py-3 bg-gray-300 text-sm text-gray-800 relative">
            {/* Close Icon */}
            <svg
              className="absolute right-2 top-2 w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={toggleDropdown}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12l8 8 2-2-8-8 8-8-2-2-8 8-8-8-2 2 8 8-8 8 2 2 8-8z" />
            </svg>
            <div className="text-gray-500 font-bold">
              Role: {driver.user_role || "Sin role"}
              {/* Botón de estado */}
              <button
                className={`ml-2 px-2 py-1 text-sm rounded-full ${
                  driver.user_status
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {driver.user_status ? "Online" : "Offline"}
              </button>
            </div>

            <div className="text-black font-medium">
              <span className="font-bold">Id:</span>{" "}
              {driver.user_id || "Sin Id"}
            </div>
            <div className="text-gray-500 font-medium">
              {driver.user_email || "Sin correo"}
            </div>
            <div className="text-gray-700 font-medium">
              <span className="font-bold">Cedula:</span>{" "}
              {driver.user_cedula || "Sin Cedula"}
            </div>
          </div>
          <ul className="py-2 text-gray-800">
            <li>
              <a
                href="/inspectionbydriver"
                className="flex items-center text-sm font-medium px-4 py-2 hover:bg-blue-100 transition-colors duration-150 cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.7 4.3c-.4-.4-1-.4-1.4 0l-6.3 6.3-2.6-2.6c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l3.5 3.5c.4.4 1 .4 1.4 0l7.7-7.7c.4-.4.4-1 0-1.4zM20 14h-5c-.6 0-1 .4-1 1s.4 1 1 1h5c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
                Inspecciones Realizadas
              </a>
            </li>
          </ul>
          <div className="py-2 px-1 text-center">
            <a
              href="/"
              className="block rounded font-medium px-6 py-2 text-sm bg-gray-800 text-white transition-colors duration-150"
            >
              Ajustes de Usuario
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
