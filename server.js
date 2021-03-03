// C'est la base de mon site. Pour lancer le site il faut faire node server.js

require('dotenv').config(); // Me permet d'initialiser des variable d'environnement (plus facile à repertorier dans le fichier .env)
const express = require('express'); //Permet d'initialiser le module express qui est un miniframwork et gère les routes.
const app = express();
const PORT = process.env.PORT || 8080; //J'appel ma variable d'env qui contient ma variable "Port" et si elle n'est pas indiqué je lui passe un autre port
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./src/strategies/discordstrategy');

//Mes routes
const authRoute = require('./src/routes/auth');

//Mon passport pour la connexion avec discord

app.use(passport.initialize());
app.use(passport.session());

//Mes routes middleware
app.use(session({

    secret: "Ajout d'un secret aléatoire",
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false

}));

app.use('/auth', authRoute); //Je lui indique que si je me retrouve sur cette route alors je doit la rediriger vers ma routes ./routes/auth

app.listen(PORT, () => {

        console.log(`Le port qui est à l'écoute est le ${PORT}`);

});