const {Client} = require('pg')
const { database } = require('pg/lib/defaults')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "231021",
    database: "postgres"

})

module.exports = client