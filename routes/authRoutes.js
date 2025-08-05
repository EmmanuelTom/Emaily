const passport = require('passport');



module.exports = app =>{
    // set up google authentication routes
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email']})
    );

    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/logout', (req, res) => {
        // Log out the user by clearing the session
        req.logout()
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        // Return the current user from the session
        res.send(req.user);

    })
}