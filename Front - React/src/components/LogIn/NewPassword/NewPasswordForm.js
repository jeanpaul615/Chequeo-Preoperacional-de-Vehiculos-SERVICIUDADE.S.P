import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { resetPassword } from "../../../controllers/Inspection/ResetPasswordController/ResetPassword";
import Footer from "../../../containers/Footer";

function NewPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    cedula: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.verificationPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await resetPassword(token, formData.cedula, formData.password);

      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Contraseña restablecida con éxito",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate("/"); // Redirigir después del restablecimiento exitoso
      } else {
        setError(response?.message || "Error desconocido al restablecer la contraseña");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al restablecer la contraseña");
    }
  };

  return (
    <div className="p-5 rounded-lg shadow-md md:w-full w-max-w-md border-dotted border-2 border-gray-400">
      <h2 className="md:text-xl text-orange-600 mb-6 font-extrabold">Digite su nueva contraseña y su cedula</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4 relative">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Cedula:</label>
          <input
            type="number"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">Confirmar Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="verificationPassword"
            value={formData.verificationPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
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
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          RESTABLECER CONTRASEÑA
        </button>
        <div className="text-right mt-4">
          <a href="/" className="text-sm">
            <span className="text-black italic">¿Ya tienes una cuenta?</span>{" "}
            <span className="text-orange-600 font-bold">Iniciar sesión</span>
          </a>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default NewPasswordForm;
