const Login = require('./Login');

exports.login = (req, res) => {
    const { email, password } = req.body;

    Login.login(email, password, (err, result) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(result);
        }
    });
};
