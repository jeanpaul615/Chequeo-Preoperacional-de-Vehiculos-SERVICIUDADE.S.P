//Componente que es un modal y se usa para mostrar los datos del desarrollador.
export function ContactModal({ isOpen, onClose }) {
  if (!isOpen) return null; // No mostrar el modal si no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Contacto del Desarrollador</h2>
        <p className="text-gray-700 mb-2"><strong>Nombre:</strong> Jean Paul Puerta</p>
        <p className="text-gray-700 mb-2"><strong>Email:</strong> jeanpaul@example.com</p>
        <p className="text-gray-700 mb-2"><strong>Teléfono:</strong> +57 123 456 7890</p>
        <button 
          onClick={onClose} 
          className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600">
          Cerrar
        </button>
      </div>

      {/* Background overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
    </div>
  ); 
}