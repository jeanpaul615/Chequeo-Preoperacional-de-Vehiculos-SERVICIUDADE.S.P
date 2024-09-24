const Login = require('./Login');
const SendEmail = require('./sendEmails');

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


exports.resetPassword = (req, res) => {
    const { token, password, cedula } = req.body;

    if (!token || !password || !cedula) {
        return res.status(400).json({ success: false, message: 'Token y contraseña son obligatorios' });
    }

    Login.resetPassword(token, password, cedula,  (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
        if (result.error) {
            return res.status(400).json({ success: false, message: result.error });
        }
        res.status(200).json({ success: true, ...result });
    });
};
