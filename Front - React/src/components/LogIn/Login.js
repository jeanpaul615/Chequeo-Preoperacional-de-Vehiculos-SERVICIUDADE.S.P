import React from 'react';
import LoginForm from './LoginForm';
import imageLogin from './imagelogin.png'; // Asegúrate de la ruta correcta a tu imagen

function Login() {
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 flex flex-col md:flex-row items-center bg-gray-300 shadow-lg rounded-lg">
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-2 text-shadow">INSPECCIÓN</h1>
          <h2 className="text-xl text-blue-600 mb-6 font-bold">PREOPERACIONAL DE VEHÍCULOS</h2>
          <LoginForm />
        </div>
        <div className="md:w-1/2 p-4 flex items-center justify-center">
          <img src={imageLogin} alt="Inspección Preoperacional de Vehículos" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Login;
