import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid'; 

function LoginForm() {
  const [showPassword, setShowPassword] = useState(true); // Estado para controlar la visibilidad de la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado para mostrar u ocultar la contraseña
  };

  return (
    <div className="p-8 rounded-lg shadow-md w-full max-w-md border-dotted border-2 border-gray-400">
      <h3 className="text-center text-2xl font-bold mb-6">LOGIN</h3>
      <form>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic">Correo Electrónico:</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
          />
        </div>
        <div className="mb-4 relative">
          <label className="pl-2 text-sm block text-gray-700 italic">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"} // Mostrar texto si showPassword es true
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-3 py-2 pt-8"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOffIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" aria-hidden="true" />
            ) : (
              <EyeIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <a href="/login" className="text-blue-500 text-sm italic">¿Olvidaste tu contraseña?</a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          INGRESAR
        </button>
        <div className="text-left  mt-4">
        <a href="/login" className="text-sm">
        <span className="text-black">No tienes una cuenta?</span> <span className="text-blue-500 font-bold  ">Registrarse</span>
        </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
