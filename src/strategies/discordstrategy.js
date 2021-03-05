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
    
    var finduser;

    try {
        usersmodel.SelectFirstUser("268801294343340033")
            .then(result =>{ 
                if(result === undefined){

                    console.log("C'est passé dans le if "+ result);
        
                } else {
        
                    console.log("c'est passé dans le else "+ result);
        
                }
            });
        } 
    catch(err) {

        console.log(err);
    }
}));

/*console.log(profile.username);
        console.log(profile.id);
        console.log(profile.guilds.length);*/