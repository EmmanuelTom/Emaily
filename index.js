const express = require('express');
const keys  = require('./config/keys')
const mongoose = require('mongoose');
const cokkieSession = require('cookie-session');
const passport = require('passport');
require('./models/user');
require("./services/passport");

mongoose.connect(keys.mongoURI)

const app = express();

app.use(
  cokkieSession({   
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey] // Secret key for signing cookies
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

