const DiscordLogin = require('passport-discord').Strategy;
const passport = require('passport');
const DiscordUser = require('./Database/Models/DiscordUsers');
const db = require('./Database/database');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async(id, done) => {
    const user = await DiscordUser.findById(id);
    if (user)
        done(null, user);
});

passport.use(new DiscordLogin({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_REDIRECT,
        scope: ['identify', 'email'],

    },
    async(accessToken, refreshToken, profile, done) => {
        try {
            const user = await DiscordUser.findOne({ discordId: profile.id, username: profile.username, avatar: profile.avatar, email: profile.email });
            if (user) {
                done(null, user);
            } else {
                const newUser = await DiscordUser.create({
                    discordId: profile.id,
                    username: profile.username,
                    avatar: profile.avatar,
                    email: profile.email
                });
                const savedUser = await newUser.save();
                done(null, savedUser);
            }
        } catch (err) {
            console.log(err);
            done(err, null);
        }
    }));