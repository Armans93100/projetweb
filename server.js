let express = require('express'); //On va appeler le module express

let app = express()

app.set('view engine', 'ejs'); //On va indiqué à notre page qu'on va passer sur le moteur ejs

app.use(express.static('public')); //On va charger le dossier public pour qu'il sois pris en compte

app.get('/', (request, response) => {

    response.render('pages/index', {test:'test'});

});


app.listen(8080);