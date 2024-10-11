import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Register } from "../../../controllers/Inspection/RegisterControllers/Register";

function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    cedula: "",
    name: "",
    role: "",
    license_until: "",
    email: "",
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

    // Mostrar un SweetAlert para solicitar el código
    const { value: inputCode } = await Swal.fire({
      title: "Ingresa el código de verificación",
      input: "password", // Usar 'password' para ocultar el código al escribir
      inputPlaceholder: "Código de verificación",
      inputAttributes: {
        maxlength: 15,
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Verificar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario cancela o no ingresa el código, detener el proceso
    if (!inputCode) {
      Swal.fire({
        icon: "warning",
        title: "Registro cancelado",
        text: "Se requiere el código de verificación para continuar.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    // Verificar si el código es correcto
    if (inputCode !== "Serviciudad1") {
      Swal.fire({
        icon: "error",
        title: "Código incorrecto",
        text: "El código ingresado es incorrecto.",
      });
      return;
    }

    try {
      const response = await Register(formData);

      if (response && response.success) {
        Swal.fire({
          icon: "success",
          title: "Registro de Usuario Exitoso",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        navigate("/"); // Redirigir después del registro exitoso
      } else {
        setError(response?.message || "Error desconocido al registrarse");
        setFormData({
          cedula: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al registrarse"); // Manejo de errores más detallado
    }
  };


  return (
    <div className="p-5 rounded-lg shadow-md md:w-full w-max-w-md border-dotted border-2 border-gray-400">
      <h2 className="md:text-xl text-orange-600 mb-6 font-extrabold">NUEVO USUARIO</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-medium font-medium text-gray-700">Cedula (*):</label>
          <input
            type="number"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            className="px-3 py-2 border border-blue-900 rounded-lg shadow-sm bg-gray-100 font-medium w-full "
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-medium font-medium text-gray-700">Nombre (*):</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="px-3 py-2 border border-blue-900 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
            required
          />
        </div>
        <div className="flex-1 mb-4">
                <label className="block text-medium font-medium text-gray-700">
                  Role (*):
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-blue-900 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="ADMIN">ADMINISTRADOR</option>
                  <option value="CONDUCTOR">CONDUCTOR</option>
                  <option value="AUDITOR">AUDITOR</option>
                </select>
              </div>
        <div className="mb-4">
          <label className="block text-medium font-medium text-gray-700">Vigencia de la Licencia (*):</label>
          <input
            type="date"
            name="license_until"
            value={formData.license_until}
            onChange={handleChange}
            className="px-3 py-2 border border-blue-900 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-medium font-medium text-gray-700">Correo Electrónico (*):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-3 py-2 border border-blue-900 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
            required
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-medium font-medium text-gray-700">Contraseña (*):</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-3 py-2 border border-blue-900 rounded-lg shadow-sm bg-gray-100 font-medium w-full"
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
