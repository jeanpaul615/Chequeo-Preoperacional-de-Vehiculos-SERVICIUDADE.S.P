const nodemailer = require('nodemailer');
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

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecer contraseña',
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${enlace}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error enviando el correo:', error);
            // También puedes retornar el error para manejarlo en la función llamante
            return false; // O lanzar un error
        } else {
            console.log('Correo enviado:', info.response);
            return true; // Indica que el envío fue exitoso
        }
    });
};

module.exports = {enviarEmail};
