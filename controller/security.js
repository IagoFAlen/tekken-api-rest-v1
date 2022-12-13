const { pool } = require('../config')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


// login autenticação
const login = (request, response, next) => {
    const { username, userpass } = request.body
    pool.query('SELECT * FROM users where username = $1 and userpass = $2', [username, userpass], (error, results) => {
        if (error || results.rowCount == 0) {
            return response.status(401).json({ auth: false, message: 'usuário ou senha inválidos' });
        }
        const userid = results.rows[0].username; //ID do usuário retornado do BD
        const username = results.rows[0].nome;
        const token = jwt.sign({ userid, username }, process.env.SECRET, {
            expiresIn: 300 //expira em 5 min
        })
        return response.json({ auth: true, token: token })
    },
    )
}


// verificação do token
function verificaJWT(request, response, next) {
    const token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) return response.status(500).json({ auth: false, message: 'Erro ao autenticar o token.' });

        // Se o token for válido, salva no request para uso posterior
        request.userId = decoded.id;
        next();
    });
}

module.exports = {
    login, verificaJWT
}