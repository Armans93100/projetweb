//Ici nous gérons toutes les routes lié à auth

const router = require('express').Router();
const passport = require('passport');


router.get('/', passport.authenticate('discord'));

router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'

}), (req, res) => {
    //console.log(req.user);
    res.send(req.user);

});

router.get('/forbidden', (req, res) => {
    res.json({
        msg: 'Degage',
        status: 200
    });
});

router.get('/succes', (req, res) => {
    res.json({
        msg: 'Succes',
        status: 200
    });
});

module.exports = router;