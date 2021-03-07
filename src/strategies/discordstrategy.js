//Ici on va recupéré toutes les infos du discord avec le passport

const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const testdb = require('../database/mysql_db');
const usersmodel = require('../models/User');
//Récupération des méthod
const db = testdb.dbconnect();

//Init du passport
passport.serializeUser(function(user, done) {
    console.log(user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id,done) => {
    const user = await usersmodel.SelectFirstUser(id);

   if(user)
   console.log("deserializer"); 
   done(null, user);
});

// On va crée notre tableau pour le scope, si je veux intérargire avec ça va être plus simple.
var scopes = ['identify', 'guilds'];

passport.use(new DiscordStrategy({

    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: scopes

}, async (accessToken, refreshToken, profile, done) => { //On vérifie les données si elles sont correct

    try {//On lance notre try and catch pour gérer les erreurs.

        //Nos variable qui vont rendre le code un peu plus propre.
        var idd = profile.id;
        var name = profile.username;

        usersmodel.SelectFirstUser(idd)//Je vérifie si le compte existe en bdd
            .then(result =>{
                    console.log("C'est passé dans le if "+ result);
                    console.log(result);
                    done(null, result);
            }).catch((message) =>{
                console.log(message);
                const saveUser = usersmodel.InsertUsers(idd, name);
                done(null, saveUser);
            });
        }
    catch(err) {

        console.log(err);
        done(err, null);
    }
}));

/*console.log(profile.username);
        console.log(profile.id);
        console.log(profile.guilds.length);*/