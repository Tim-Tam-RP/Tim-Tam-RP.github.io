require('dotenv').config();
const express = require('express');
const OAuth2_login = express();
const passport = require('passport');
const session = require('express-session');
const DiscordLogin = require('./DiscordLogin');
const Routes = require('./Routes');
const PORT = process.env.PORT || 2036;
const db = require('./Database/database');
const http = require('http');
const hostname = '127.0.0.1';

db.then(() => console.log('Connected to Mongodb')).catch(err => console.log(err));

OAuth2_login.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

OAuth2_login.use(session({
    secret: 'Initializing the session',
    resave: true,
    Cookie: {
        MaxAge: 6000 * 60 * 24
    },
    saveUninitialized: false,
}));

OAuth2_login.use(passport.initialize());
OAuth2_login.use(passport.session());

OAuth2_login.use('/discord/oauth2/login', Routes);