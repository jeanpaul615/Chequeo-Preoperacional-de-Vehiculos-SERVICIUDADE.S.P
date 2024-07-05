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
   tacometrovelocimetro: "",
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
   latoneriaypintura: "",
   estadoPlatonCarroceria: "",
   carpas: "",
   compuertas: "",
   estribos: "",
   sillas: "",
   cojineria: "",
   tapetes: "",
   pernoscompletos: "",
   muellesyamortiguadores: "",
   tanquecombustible: "",
   tanqueaire: "",
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


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <Container formData={formData} handleChange={handleChange} />
      </form>
      <button id="submit" type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded"> Guardar</button>
    </div>
  );
};

export default InspectionForm;
