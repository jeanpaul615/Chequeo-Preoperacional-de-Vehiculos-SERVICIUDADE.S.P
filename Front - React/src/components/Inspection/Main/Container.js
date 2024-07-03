import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InspectionCompactador from '../EstadoV1/InspectionCompactador';
import InspectionInstrumentos from '../EstadoV1/InspectionInstrumentos';
import InspectionLlantas from '../EstadoV1/InspectionLlantas';
import InspectionNiveles from '../EstadoV2/InspectionNiveles';
import InspectionOtros from '../EstadoV2/InspectionOtros';
import InspectionVial from '../EstadoV2/InspectionVial';
import InspectionVidrios from '../EstadoV3/InspectionVidrios';
import InspectionRevisionInterna from '../EstadoV3/InspectionRevisionInterna';
import InspectionConductor from '../EstadoV3/InspectionConductor';
import InspectionLuces from '../EstadoV3/InspectionLuces';
import InspectionVehicule from '../DriverVehicule/InspectionVehicule';
import InspectionDriver from '../DriverVehicule/InspectionDriver';

const componentGroups = [
  {
    id: 'vehiculeDriver',
    title: 'Datos del Vehículo y Conductor',
    components: [
      { id: 'driver', component: InspectionDriver },
      { id: 'vehicule', component: InspectionVehicule }
    ],
  },
  {
    id: 'estadoV1',
    title: 'Compactador, Instrumentos y Llantas',
    components: [
      { id: 'compactador', component: InspectionCompactador },
      { id: 'instrumentos', component: InspectionInstrumentos },
      { id: 'llantas', component: InspectionLlantas },
    ],
  },
  {
    id: 'estadoV2',
    title: 'Niveles, Vial y Otros',
    components: [
      { id: 'niveles', component: InspectionNiveles },
      { id: 'otros', component: InspectionOtros },
      { id: 'vial', component: InspectionVial },
    ],
  },
  {
    id: 'estadoV3',
    title: 'Vidrios, Revision interna, Luces y Conductor',
    components: [
      { id: 'vidrios', component: InspectionVidrios },
      { id: 'revisionInterna', component: InspectionRevisionInterna },
      { id: 'luces', component: InspectionLuces },
      { id: 'conductor', component: InspectionConductor }
    ],
  },
];

export default function ContainerInspection({ formData, handleChange }) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {componentGroups.map((group) => (
          <motion.div
            key={group.id}
            layoutId={group.id}
            onClick={() => setSelectedGroupId(group.id)}
            className="cursor-pointer p-4 border rounded-lg"
          >
            <h3 className="text-xl font-semibold">{group.title}</h3>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedGroupId && (
          <motion.div
            layoutId={selectedGroupId}
            className="fixed inset-0 bg-white p-8 z-50 overflow-auto"
          >
            {componentGroups
              .filter(group => group.id === selectedGroupId)
              .map(group => (
                <div key={group.id}>
                  <h3 className="text-xl font-semibold mb-4">{group.title}</h3>
                  {group.components.map(({ id, component: Component }) => (
                    <Component key={id} formData={formData} handleChange={handleChange} />
                  ))}
                  <motion.button
                    onClick={() => setSelectedGroupId(null)}
                    className="mt-4 p-2 bg-red-500 text-white rounded"
                  >
                    Close
                  </motion.button>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
