import React from "react";
import NewPasswordForm from "./NewPasswordForm";
import bannerserviciudad from "../../../assets/Navbar/banner-serviciudad.png";
import registerimg from "../../../assets/Register/register.png";


function NewPassword() {
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
      <div className="max-w-6xl h-auto m-12 mx-auto p-6 flex flex-col md:flex-row justify-center items-center shadow-2xl rounded-lg hover:shadow-black">
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <h1 className="md:text-3xl text-2xl font-extrabold mb-2 text-shadow">
            CAMBIAR CONTRASEÑA
          </h1>
          <NewPasswordForm />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col items-center">
          <p className="text-lg text-gray-700 text-center mb-4 font-bold">
            Bienvenido al sistema de chequeos preoperacionales de Serviciudad. Por favor, complete el formulario para cambiar la contraseña.
          </p>
          <img
            src={registerimg}
            alt="Register Illustration"
            className="mt-6 border-4 border-orange-500 shadow-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
