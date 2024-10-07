const Login = require('./Login');
const SendEmail = require('./sendEmails');

// Controlador para registrar un nuevo usuario
exports.register = (req, res) => {
    const { cedula, email, password, role, status } = req.body;

    if (!cedula || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    // Verificar si la cédula ya existe
    Login.checkCedula(cedula, (err, cedulaExists) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (cedulaExists) {
            return res.status(409).json({ success: false, message: 'La cédula ya está registrada' });
        }

        // Verificar si el email ya existe
        Login.checkEmail(email, (err, emailExists) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error en el servidor' });
            }
            if (emailExists) {
                return res.status(409).json({ success: false, message: 'El email ya está registrado' });
            }

            // Registrar el nuevo usuario si la cédula y el email no existen
            Login.register({ cedula, email, password, role, status }, (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Error en el servidor' });
                }
                res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });
            });
        });
    });
};

/**
 * @route POST /login
 * @description Inicia sesión de un usuario.
 * @param {string} email - Email del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Object} 200 - Datos del usuario y token de sesión.
 * @returns {Error} 400 - Si faltan campos obligatorios.
 * @returns {Error} 401 - Si las credenciales son incorrectas.
 * @returns {Error} 500 - Si ocurre un error en el servidor.
 */
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son obligatorios' });
    }

    Login.login(email, password, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (result.error) {
            return res.status(401).json({ success: false, message: result.error });
        }
        res.status(200).json({ success: true, ...result });
    });
};

/**
 * @route POST /request-password-reset
 * @description Solicita un restablecimiento de contraseña.
 * @param {string} email - Email del usuario.
 * @returns {Object} 200 - Mensaje de éxito.
 * @returns {Error} 400 - Si el email es obligatorio.
 * @returns {Error} 404 - Si el email no está registrado.
 * @returns {Error} 500 - Si ocurre un error en el servidor.
 */
exports.requestPasswordReset = (req, res) => {
    const { email } = req.body;

    if (!email) {
        console.log('El email es obligatorio');
        return res.status(400).json({ success: false, message: 'El email es obligatorio' });
    }

    Login.checkEmail(email, (err, cedulaExists) => {
        if (err) {
            console.log('Error en checkEmail:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (!cedulaExists) {
            console.log('Cedula no registrado');
            return res.status(404).json({ success: false, message: 'Email no registrado' });
        }

        Login.requestPasswordReset(email, (err, token) => {
            if (err) {
                console.log('Error en requestPasswordReset:', err);
                return res.status(500).json({ success: false, message: 'Error en el servidor' });
            }
            
            const emailSent = SendEmail.enviarEmail(email, token);

            res.status(200).json({ success: true, message: 'Se ha enviado un correo para restablecer la contraseña' });
        });
    });
};

/**
 * @route POST /reset-password
 * @description Restablece la contraseña del usuario.
 * @param {string} token - Token de restablecimiento de contraseña.
 * @param {string} password - Nueva contraseña.
 * @param {string} cedula - Cédula del usuario.
 * @returns {Object} 200 - Mensaje de éxito.
 * @returns {Error} 400 - Si faltan campos obligatorios.
 * @returns {Error} 500 - Si ocurre un error en el servidor.
 */
exports.resetPassword = (req, res) => {
    const { token, password, cedula } = req.body;

    if (!token || !password || !cedula) {
        return res.status(400).json({ success: false, message: 'Token y contraseña son obligatorios' });
    }

    Login.resetPassword(token, password, cedula, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }
        res.status(200).json({ success: true, ...result });
    });
};
