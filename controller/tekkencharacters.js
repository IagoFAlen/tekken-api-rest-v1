const {pool} = require('../config');

const getCharacters = (request, response) => {
    pool.query("select * from tekkencharacters", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getCharactersById = (request, response) => {
    const id = parseInt(request.params.characterid);

    pool.query(
        "select * from tekkencharacters where characterid = $1",
        [id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

const createCharacters = (request, response) => {
    const { characterid, id_user, charname } = request.body;

    pool.query(
        "INSERT INTO tekkencharacters (characterid, id_user, charname) VALUES ($1, $2, $3)",
        [characterid, id_user, charname],
        (error, results) => {
            console.log(request.body);
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.insertId}`);
        }
    );
};

const updateCharacters = (request, response) => {
    const id = parseInt(request.params.characterid);
    const { id_user, charname } = request.body;

    pool.query(
        "UPDATE tekkencharacters SET name = $1, userpass = $2 WHERE characterid = $3",
        [username, userpass, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteCharacters = (request, response) => {
    const id = parseInt(request.params.characterid);

    pool.query("DELETE FROM users WHERE characterid = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getCharacters, createCharacters, updateCharacters, deleteCharacters, getCharactersById
}