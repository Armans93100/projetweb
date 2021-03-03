//ici je gère mes connexion à ma base de données

function dbconnect() {

    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'cols_cops_intra'
    });

    connection.connect();

    return connection;
}

exports.dbconnect = dbconnect;