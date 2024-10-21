import React, { useState } from "react";
import Swal from "sweetalert2";
import { sendResetPasswordEmail } from "../../../controllers/Inspection/ResetPasswordControllers/ResetPassword";

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await sendResetPasswordEmail(formData); // Envía cédula y correo

      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Correo de restablecimiento enviado",
          text: "Por favor, revisa tu bandeja de entrada para continuar con el proceso.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        setError(response?.message || "Error al enviar el correo de restablecimiento");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al procesar la solicitud");
    }
  };

  return (
    <div className="p-5 rounded-lg shadow-md md:w-full w-max-w-md border-dotted border-2 border-gray-400">
      <h2 className="md:text-xl text-orange-600 mb-6 font-extrabold">Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Cédula:</label>
          <input
            type="number"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Correo Electrónico Personal(No empresarial):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          Enviar Correo de Restablecimiento
        </button>
        <div className="text-right mt-4">
          <a href="/" className="text-sm">
            <span className="text-black italic">¿Recuerdas tu contraseña?</span>{" "}
            <span className="text-orange-600 font-bold">Iniciar sesión</span>
          </a>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
