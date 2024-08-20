const Login = require('./Login');

exports.register = (req, res) => {
    const { email, password, role, status } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    Login.register({ email, password, role, status }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    Login.login(email, password, (err, result) => {
        if (err) {
            return res.status(500).send('Error en el servidor');
        }
        if (result.error) {
            return res.status(401).json({ message: result.error });
        }
        res.status(200).json(result);
    });
};
