//Ici nous gérons toutes les routes lié à dashboard

const router = require('express').Router();

function isAuthorized(req, res, next){
    console.log(req.user);
    if(req.user){
        console.log("user is logged");
        console.log(req.user);
        next();
    }else{
        console.log("user is not logged in");
        res.redirect('/auth/forbidden');
    }
}

router.get('/', isAuthorized, (req, res) => {
    if(req.user)
    res.send(200);
});

router.get('/settings', (req, res) => {
    res.send(200);
});

module.exports = router;