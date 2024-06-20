import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'; 

function LoginForm() {
  const [showPassword, setShowPassword] = useState(true); // Estado para controlar la visibilidad de la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para mostrar u ocultar la contraseña
  };

  return (
    <div className="p-5 rounded-lg shadow-md md:w-full w- max-w-md border-dotted border-2 border-gray-400">
      <h3 className="text-center text-2xl font-bold mb-2 -mt-4<">Inicio de Sesión</h3>
      <form>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Correo Electrónico:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
          />
        </div>
        <div className="mb-4 relative">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"} // Mostrar texto si showPassword es true
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 pt-7"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="mb-6 text-right">
          <a href="/login" className="text-blue-500 text-sm italic">¿Olvidaste tu contraseña?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          INGRESAR
        </button>
        <div className="text-right  mt-4">
        <a href="/login" className="text-sm">
        <span className="text-black">No tienes una cuenta?</span> <span className="text-orange-600 font-bold  ">Registrarse</span>
        </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
