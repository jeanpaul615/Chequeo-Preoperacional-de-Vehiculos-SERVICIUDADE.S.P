import React from "react";
import LoginForm from "./LoginForm";
import imageLogin from "../../assets/Login/imagelogin.png";
import bannerserviciudad from "../../assets/Navbar/banner-serviciudad.png";
import logoserviciudad from "../../assets/Login/logo-serviciudad.png";

function Login() {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <div className="bg-blue-600">
        <nav className="max-w-4xl mx-auto py-4">
          <img
            src={bannerserviciudad}
            alt="logo serviciudad"
            className="max-w-full h-12 mx-auto md:h-24"
          />
        </nav>
      </div>
      <div className="flex-grow h-auto m-12 mx-auto p-8 flex flex-col md:flex-row justify-center items-center shadow-2xl rounded-lg hover:shadow-black">
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <h1 className="md:text-3xl text-2xl font-extrabold mb-2 text-shadow">
            INSPECCIÓN
          </h1>
          <h2 className="md:text-xl text-orange-600 mb-6 font-extrabold">
            PREOPERACIONAL DE VEHÍCULOS
          </h2>
          <LoginForm />
        </div>
        <div
          className="md:w-auto p-4 md:flex hidden items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${logoserviciudad})`,
            minHeight: "10rem",
          }}
        >
          <img
            src={imageLogin}
            alt="Inspección Preoperacional de Vehículos"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
