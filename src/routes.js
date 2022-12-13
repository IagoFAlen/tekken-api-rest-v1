const { Router } = require('express');

const controlUsers = require('../controller/users.js');
const controlTekkenCharacters = require("../controller/tekkencharacters.js");
const security = require("../controller/security.js");

const rotas = new Router();

rotas.route('/login')
   .post(security.login)

rotas.route('/users')
   .get(security.verificaJWT, controlUsers.getUsers)
   .post(security.verificaJWT, controlUsers.createUser)
   .put(security.verificaJWT, controlUsers.updateUser)

rotas.route('/users/:id')
   .get(security.verificaJWT, controlUsers.getUserById)
   .delete(security.verificaJWT, controlUsers.deleteUser)


rotas.route('/tekkencharacters')
     .get(security.verificaJWT, controlTekkenCharacters.getCharacters)
     .post(security.verificaJWT, controlTekkenCharacters.createCharacters)
     .put(security.verificaJWT, controlTekkenCharacters.updateCharacters)

rotas.route('/tekkencharacters/:id')
     .get(security.verificaJWT, controlTekkenCharacters.getCharactersById)
     .delete(security.verificaJWT, controlTekkenCharacters.deleteCharacters)

module.exports = rotas;