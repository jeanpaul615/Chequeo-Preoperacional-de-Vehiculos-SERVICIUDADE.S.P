import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Auth } from "../../../controllers/AuthControllers/Auth"; // Ajusta la ruta según sea necesario

function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    license_until: "",
    seguridad_social: "",
    email: "",
    password: "",
    role: "conductor",
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
    try {
      const response = await Auth(formData);
      console.log("Respuesta de registro:", response);
      if (response) {
        navigate("/");
      } else {
        setError("Error al registrarse");
      }
    } catch (error) {
      setError(error.message || "Error al registrarse");
    }
  };

  return (
    <div className="p-5 rounded-lg shadow-md md:w-full w-max-w-md border-dotted border-2 border-gray-400">
      <h2 className="md:text-xl text-orange-600 mb-6 font-extrabold">
        NUEVO USUARIO
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">
            Nombre Completo:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">
            Vigencia de la Licencia:
          </label>
          <input
            type="date"
            name="license_until"
            value={formData.license_until}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">
            Seguro Social:
          </label>
          <select
            name="seguridad_social"
            value={formData.seguridad_social}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="value1">Si</option>
            <option value="value2">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">
            Correo Electrónico:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-full border-blue-700 focus:outline-none focus:border-gray-300"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">
            Contraseña:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
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
              <EyeOffIcon
                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                className="h-6 w-6 text-gray-500 hover:text-gray-700"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          REGISTRARSE
        </button>
        <div className="text-right mt-4">
          <a href="/" className="text-sm">
            <span className="text-black italic">¿Ya tienes una cuenta?</span>{" "}
            <span className="text-orange-600 font-bold">Iniciar sesión</span>
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
