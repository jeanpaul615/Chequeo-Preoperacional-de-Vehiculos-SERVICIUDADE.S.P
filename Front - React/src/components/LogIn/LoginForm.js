import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Auth } from "../../controllers/Inspection/AuthControllers/Auth"; // Ajusta la ruta según sea necesario

/**
 * LoginForm Component
 * El componente LoginForm se encarga de manejar la estructura del formulario, 
 * ademas de enviar el submit de la autenticación, tambien redirije a el componente principal
 *
 */
function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Auth(formData);
      // Verifica que la respuesta tenga la propiedad 'access_token'
      if (response && response.access_token) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="p-5 rounded-lg shadow-md md:w-full w-max-w-md border-dotted border-2 border-gray-400">
      <h3 className="text-center text-2xl font-bold mb-2 -mt-4">
        Inicio de Sesión
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="pl-2 text-sm block text-gray-700 italic font-bold">
            Usuario:
          </label>
          <input
            type="text" // Corrige el tipo de input
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
        <div className="mb-6 text-right">
          <a href="/login" className="text-blue-500 text-sm italic">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 font-bold rounded-full hover:bg-blue-700 transition duration-200"
        >
          INGRESAR
        </button>
        <div className="text-right mt-4">
          <a href="/register" className="text-sm">
            <span className="text-black italic">No tienes una cuenta?</span>{" "}
            <span className="text-orange-600 font-bold">Registrarse</span>
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
