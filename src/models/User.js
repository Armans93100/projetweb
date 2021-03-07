/* Ce fichier est le models (respectant le système de MVC) pour gérer les compte utilisateurs*/

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

async function SelectFirstUser(where = 0){//On crée notre fonction de manière async
    return new Promise(function (resolve, reject){ //On crée notre promesse pour la récupération des comptes.

        var replace = where.toString(); //toString() permet de convertir un int en chaine de caractère

        db.query('SELECT * FROM `users` WHERE `iddiscord` = ?', [replace], 
        function (err, result, fields) {
            if (err) throw err;
            if(result.length == 0) {return reject("Aucun compte en bdd");} //Sécurité ou cas ou ma base est vide.

            var resulttrue = result[0]['iddiscord']; //faire une variable qu'avec notre valeur

            if(resulttrue === replace){ //Si la variable de retour n'est pas vide.
                resolve(resulttrue); //Je vais chercher dans mon tableau l'info et je la resolve
            }else {
                reject("Non trouvé en bdd"); //Je retourne mon reject.
            }
        });
    });
}

exports.InsertUsers = InsertUsers;
exports.SelectFirstUser = SelectFirstUser;

/* Chaque resolve doit être récupéré avec un  .then(variable =>{});
chaque reject doit être récupéré avec un .catch(variable =>{});
*/