const express = require('express');
const keys  = require('./config/keys')
const mongoose = require('mongoose');
const cokkieSession = require('cookie-session');
const bodyParser = require("body-parser")
const passport = require('passport');
const path = require('path');
require('./models/user');
require("./services/passport");

mongoose.connect(keys.mongoURI)

const app = express();

app.use(bodyParser.json());
app.use(
  cokkieSession({   
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey] // Secret key for signing cookies
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Serve static assets (main.js, main.css) in production
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Handle React routing, return all requests to React app
  app.get('/:path*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

