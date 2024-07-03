import React, { useState } from "react";
import Container from './Container';
const InspectionForm = () => {
  const [formData, setFormData] = useState({
   fecha: "",
   nombreConductor: "",
   licencia: "",
   seguridadSocial: "",
   tipoVehiculo: "",
   placa: "",
   marca: "",
   dependencia: "",
   kilometraje: "",
   soat: "",
   rtm: "",
   seguroContractual: "",
   seguroExtracontractual: "",
   aceitemotor: "",
   aceitehidraulico: "",
   liquidodefrenos: "",
   refrigerante: "",
   aguaparabrisas: "",
   nivelcombustible: "",
   presionaire: "",
   lubricacion: "",
   paneldecontrol: "",
   niveldecombustibles: "",
   cargabateria: "",
   temperaturamotor: "",
   tacometrovelocímetro: "",
   parabrisas: "",
   limpiaparabrisas: "",
   laterales: "",
   vidriotrasero: "",
   limpiaparabrisastrasero: "",
   espejoretrovisor: "",
   espejoslaterales: "",
   bajas: "",
   plenas: "",
   direccionales: "",
   cocuyos: "",
   reversa: "",
   antiniebla: "",
   cabina: "",
   emergencia: "",
   tableroytestigos: "",
   frenodeseguridad: "",
   alarmadereversa: "",
   cinturondeseguridad: "",
   bocina: "",
   apoyacabezas: "",
   airbag: "",
   manijasChapas: "",
   puertasSeguros: "",
   elevavidrios: "",
   sillasCojineria: "",
   latoneriaPintura: "",
   estadoPlatonCarroceria: "",
   carpas: "",
   compuertas: "",
   estribos: "",
   sillas: "",
   cojineria: "",
   tapetes: "",
   pernosCompletos: "",
   muellesAmortiguadores: "",
   tanqueCombustible: "",
   tanqueAire: "",
   llantaDelanteraDerecha: "",
   llantaDelanteraIzquierda: "",
   llantaTraseraDerecha: "",
   llantaTraseraIzquierda: "",
   llantaRepuesto: "",
   kitSeguridad: "",
   kitDerrames: "",
   conos: "",
   chalecoReflectivo: "",
   campana: "",
   tanquelixiviado: "",
   rejilla: "",
   mangueraLixiviado: "",
   empaquePortalon: "",
   cilindrosHidraulicos: "",
   seguroPortalon: "",
   pruebaEmbriaguez: "",
   estadoSaludConductor: ""
  });

  const [showNiveles, setShowNiveles] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowNiveles(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <Container formData={formData} handleChange={handleChange} />
        {showNiveles && <Container formData={formData} handleChange={handleChange} />}
      </form>
    </div>
  );
};

export default InspectionForm;
