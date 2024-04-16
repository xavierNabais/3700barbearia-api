const mysql = require("mysql2");
const dbConfig = require('../config/db.config.js');

//Criar conexão com a base de dados
const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.db
});

//Executar ligação ao servidor
connection.connect(error => {
    if (error) throw error;
    console.log('Conexão com a base de dados estabelecida.');
});

module.exports = connection;