import React, { useState } from "react";
import logoServiciudad from "./LOGO.png";

//Footer para los componentes que lo requieran, componente informativo.
export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Funciones para abrir y cerrar el modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Contenedor principal para añadir margen inferior */}
      <div className="pb-28"> {/* Asegúrate de que el valor aquí sea suficiente para el footer */}
        {/* Aquí irían los demás componentes o contenido */}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-orange-500 shadow-lg z-50">
        <footer className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src={logoServiciudad}
              alt="Logo Serviciudad"
              className="h-10 mr-3"
            />
          </div>

          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row md:items-center">
            <span className="text-sm text-white font-medium mb-4 md:mb-0 md:mr-6">
              © 2024{" "}
              <a href="https://www.serviciudad.gov.co/" className="hover:underline">
                Jean Paul Puerta
              </a>
              . Todos los derechos reservados.
            </span>

            <ul className="flex flex-wrap items-center text-sm font-medium text-white">
              <li className="mr-6">
                <a href="/" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li className="mr-6">
                <a
                  href="https://www.serviciudad.gov.co/"
                  className="hover:underline"
                >
                  Nosotros
                </a>
              </li>
              <li className="mr-6">
                <a
                  href="https://saia-serviciudad.netsaia.com/ws/registro_pqrsd/index.html"
                  className="hover:underline"
                >
                  PQRS
                </a>
              </li>
              <li>
                <button onClick={openModal} className="hover:underline">
                  Contacto
                </button>
              </li>
            </ul>
          </div>
        </footer>
      </div>

      {/* Modal de Contacto */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-lg transition-transform transform scale-95">
            {/* Logo and Close Button */}
            <div className="flex justify-between items-center mb-6">
              <img
                src={logoServiciudad}
                alt="Logo Serviciudad"
                className="h-12"
              />
            </div>

            {/* Contact Info */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Datos de Contacto
            </h2>
            <p className="text-gray-600 mb-2">
              <strong>Desarrollador:</strong> Jean Paul Puerta
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> salazarjean2003@gmail.com
            </p>
            <p className="text-gray-600 mb-6">
              <strong>Teléfono:</strong> +57 320 395 6315
            </p>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
