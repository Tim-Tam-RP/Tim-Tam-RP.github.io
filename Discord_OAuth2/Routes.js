const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('http://localhost:2034/Website/authorised/home.html', passport.authenticate('discord', {
    failureRedirect: '/unauthorised'
}));
router.get('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.redirect('/');
    } else {
        req.redirect('/');
    }
})

module.exports = router;