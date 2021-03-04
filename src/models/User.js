const { createPool } = require('mysql2/promise');
const testdb = require('../database/mysql_db');
const db = testdb.dbconnect();

function InsertUsers(iddiscord, username){

    var replace = iddiscord.toString(); //toString() permet de convertir un int en chaine de caractère

    db.query('INSERT INTO users SET ?', {iddiscord: replace, users: username}, function (err, results, fields) {
    if (err) throw err;
    });
}

async function SelectUser(where = 0, callback){

    //Vu que les clefs sont trop longue pour l'int on va transformer les int en varchar en bdd.
    var replace = where.toString(); //toString() permet de convertir un int en chaine de caractère

    await db.query('SELECT * FROM `users` WHERE `iddiscord` = ?', [replace],
    function (err, results, fields) {
        if (err) throw err;

        var row = results[0]['iddiscord'];
        return parseInt(row).then(parseok => { return parseok });
    });
}


exports.InsertUsers = InsertUsers;
exports.SelectUser = SelectUser;