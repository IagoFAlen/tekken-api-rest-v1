const {pool} = require('../config');

const getUsers = (request, response) => {
    pool.query("select * from users", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("select * from users where userid = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const createUser = (request, response) => {
    const { userid, username, userpass } = request.body;

    pool.query(
        "INSERT INTO users (userid, username, userpass) VALUES ($1, $2, $3)",
        [userid, username, userpass],
        (error, results) => {
            console.log(request.body);
            if (error) {
                throw error;
            }
            response.status(201).send(`User added with ID: ${results.insertId}`);
        }
    );
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { username, userpass } = request.body;

    pool.query(
        "UPDATE users SET name = $1, userpass = $2 WHERE userid = $3",
        [username, userpass, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`User modified with ID: ${id}`);
        }
    );
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM users WHERE userid = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`User deleted with ID: ${id}`);
    });
};

module.exports = {
    getUsers, createUser, updateUser, deleteUser, getUserById
}