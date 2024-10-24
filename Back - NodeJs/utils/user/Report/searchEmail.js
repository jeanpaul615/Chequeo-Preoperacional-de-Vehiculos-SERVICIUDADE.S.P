const { sendReport } = require('./SendReport'); // Asegúrate de importar la función sendReport

const searchEmail = async (req, res) => {
    const { driver_id, fecha, placa, tipo_vehiculo, nombre_conductor, inspection_id, reports } = req.body;

    try {
        console.log("SEARCH: ", driver_id, fecha, placa, tipo_vehiculo, nombre_conductor, inspection_id, reports);
        await sendReport({
            driver_id,
            fecha,
            placa,
            tipo_vehiculo,
            nombre_conductor,
            inspection_id,
            reports
        });
        return res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (sendError) {
        console.error('Error al enviar el reporte:', sendError);
        return res.status(500).json({ message: 'Error al enviar el reporte' });
    }
};

module.exports = {
    searchEmail
};
