import React from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ Title }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate('/'); // Redirige a la página de inicio de sesión
  };

  return (
    <div className="bg-gray-800 text-white shadow-md rounded-lg p-4 mb-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">{Title}</h1>
      <div className="flex items-center">
        <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
