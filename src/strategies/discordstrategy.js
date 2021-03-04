//Ici on va recupéré toutes les infos du discord avec le passport

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const testdb = require('../database/mysql_db');
const usersmodel = require('../models/User');

//Récupération des méthod
const db = testdb.dbconnect();

var scopes = ['identify', 'email', 'guilds', 'guilds.join']; // On va crée notre tableau pour le scope, si je veux intérargire avec ça va être plus simple.

passport.use(new DiscordStrategy({

    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes

}, async (accessToken, refreshToken, profile, done) => { //On vérifie les données si elles sont correct

    try {
        const findfirst = usersmodel.SelectUser(profile.id);
        console.log("premier test"+usersmodel.SelectUser(profile.id));

        findfirst.then(function(results){
            if(results ==! undefined) {
                console.log("Il est entrée dans le if "+results);
            } else {
                console.log("Il est entrée dans le else "+results);
            }
        });

    } catch(err) {

        console.log(err);
    }
}));

/*console.log(profile.username);
        console.log(profile.id);
        console.log(profile.guilds.length);*/