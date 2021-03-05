const { createPool } = require('mysql2/promise');
const { promisify } = require('util');
const testdb = require('../database/mysql_db');
const db = testdb.dbconnect();

function InsertUsers(iddiscord, username){

    var replace = iddiscord.toString(); //toString() permet de convertir un int en chaine de caractère

    db.query('INSERT INTO users SET ?', {iddiscord: replace, users: username}, function (err, results, fields) {
    if (err) throw err;
    });
}

async function SelectFirstUser(where = 0){
    return new Promise(function (resolve, reject){

        var replace = where.toString();
        db.query('SELECT * FROM `users` WHERE `iddiscord` = ?', [replace], 
        function (err, result, fields) {
            if (err) throw err;
                resolve(result[0]['iddiscord']);
        });
    });
}

exports.InsertUsers = InsertUsers;
exports.SelectFirstUser = SelectFirstUser;