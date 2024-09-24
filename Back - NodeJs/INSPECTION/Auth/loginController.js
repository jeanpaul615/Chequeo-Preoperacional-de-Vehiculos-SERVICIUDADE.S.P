const Login = require('./Login');

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