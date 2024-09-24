const nodemailer = require('nodemailer');
const path = require('path'); // Importa el módulo 'path'
require('dotenv').config(); // Cargar variables de entorno

// Configurar el transportador de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Servidor SMTP de Outlook
    port: 587, // Puerto SMTP
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER, // Almacena tu email en .env
        pass: process.env.EMAIL_PASS,   // Almacena tu contraseña en .env
    },
});

const enviarEmail = (email, token) => {
    const enlace = `http://localhost:3000/reset-password?token=${token}`;

    // Opciones del correo
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablece tu contraseña',
        html: `
        <div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);">
                
                <!-- Banner -->
                <div style="text-align: center;">
                    <img src="cid:bannerserviciudad" alt="Restablecer Contraseña" style="max-width: 100%; height: auto; border-radius: 8px; background-color: #2475dc;" />
                </div>
                
                <!-- Título -->
                <h2 style="color: #333333;">Solicitud de restablecimiento de contraseña - Chequeo Preoperacional de Vehiculos</h2>
                
                <!-- Mensaje de introducción -->
                <p style="color: #555555; font-size: 16px;">
                    Hola, hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, simplemente ignora este mensaje. De lo contrario, puedes restablecer tu contraseña haciendo clic en el siguiente botón:
                </p>
                
                <!-- Botón de acción -->
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${enlace}" style="background-color: #007BFF; color: #ffffff; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                        Restablecer contraseña
                    </a>
                </div>
                
                <!-- Enlace alternativo -->
                <p style="color: #999999; font-size: 14px;">
                    Si tienes problemas haciendo clic en el botón, copia y pega el siguiente enlace en tu navegador:
                    <br />
                    <a href="${enlace}" style="color: #007BFF;">${enlace}</a>
                </p>

                <!-- Despedida -->
                <p style="color: #555555; font-size: 16px;">Gracias,<br />El equipo de soporte SERVICIUDAD ESP</p>
            </div>
        </div>
        `,
        attachments: [
            {
                filename: 'bannerserviciudad.png', // Nombre del archivo
                path: path.join(__dirname, 'bannerserviciudad.png'), // Ruta del archivo
                cid: 'bannerserviciudad' // Este CID se utiliza en el src de la imagen
            }
        ]
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error enviando el correo:', error);
            return false;
        } else {
            console.log('Correo enviado:', info.response);
            return true;
        }
    });
};

module.exports = { enviarEmail };
