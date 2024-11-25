const nodemailer = require('nodemailer'); // Librería para enviar correos electrónicos
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

/**
 * Función para enviar un reporte de inspección vía correo electrónico.
 * @param {Object} reportData - Objeto que contiene los datos del reporte.
 * @param {number} reportData.driver_id - ID del usuario.
 * @param {string} reportData.fecha - Fecha de la inspección.
 * @param {string} reportData.placa - Placa del vehículo.
 * @param {string} reportData.tipo_vehiculo - Tipo de vehículo.
 * @param {string} reportData.nombre_conductor - Nombre del conductor.
 * @param {number} reportData.inspection_id - ID de la inspección.
 * @param {number} reportData.reports - Cantidad de reportes malos.
 */
const sendReport = async ({ driver_id, fecha, placa, tipo_vehiculo, nombre_conductor, inspection_id, reports }) => {
    try {
        // Configura el transporte de nodemailer usando variables de entorno
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Puedes cambiar esto por otro servicio (Ej: Outlook, Yahoo)
            auth: {
                user: process.env.EMAIL_USER, // Tu email almacenado en el archivo .env
                pass: process.env.EMAIL_PASS, // Tu contraseña almacenada en el archivo .env
            }
        });

        // Verificar conexión con el servicio de correo (opcional pero útil)
        await transporter.verify();

        // Plantilla HTML para el cuerpo del correo
        const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <header style="text-align: center; padding: 10px; background-color: #4CAF50; color: white;">
                <h1>Reporte de Inspección SERVICIUDAD ESP</h1>
            </header>
            <section style="padding: 20px;">
                <h2 style="color: #333;">Detalles de la Inspección</h2>
                <p>Estimado usuario,</p>
                <p>A continuación, se presentan los detalles del reporte de inspección:</p>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>ID Usuario:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${driver_id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fecha:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${fecha}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Placa del Vehículo:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${placa}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Tipo de Vehículo:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${tipo_vehiculo}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Nombre del Conductor:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${nombre_conductor}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>ID Inspección:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${inspection_id}</td>
                    </tr>
                    <tr style="background-color: #f2f2f2;">
                        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Reportes Malos:</strong></td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${reports}</td>
                    </tr>
                </table>
                <p>Te invitamos a revisar la plataforma para más detalles sobre esta inspección. Si tienes alguna consulta, no dudes en contactarnos.</p>
            </section>
            <footer style="text-align: center; padding: 20px; background-color: #f8f8f8; color: #777;">
                <p>Este correo fue generado automáticamente por el sistema de inspecciones de SERVICIUDAD E.S.P. No responda a este correo.</p>
                <p>&copy; ${new Date().getFullYear()} Inspecciones Vehiculares SERVICIUDAD E.S.P, Todos los derechos reservados.</p>
            </footer>
        </div>
        `;

        // Configura las opciones del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // Remitente (tu email)
            to: "salazarjean2003@gmail.com", // Destinatario
            subject: 'Reporte de Inspección - Detalles Completos', // Asunto del correo
            text: `Detalles de la Inspección:\nID Usuario: ${driver_id}\nFecha: ${fecha}\nPlaca: ${placa}\nTipo de Vehículo: ${tipo_vehiculo}\nNombre del Conductor: ${nombre_conductor}\nID Inspección: ${inspection_id}\nSe enviaron: ${reports} Reportes Malos.\nPor favor revisa la plataforma para acceder a más detalles.`, // Texto en caso de que el HTML no sea soportado
            html: htmlContent, // Versión HTML del cuerpo del correo
        };

        // Enviar el correo
        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('Error al enviar el correo'); // Lanza un error si falla el envío
    }
};

module.exports = {
    sendReport
};
