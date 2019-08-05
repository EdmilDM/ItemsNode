const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

const env = require('./config/env');
const logger = require('./config/winston');
const routes = require('./routes/index');
require('./database/connector'); // Stablish database connection.

const app = express();
const port = env.PORT;

// Passport configuration and initizalizing.
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


// Adding logging middleware, app needs a log folder with an app.log file.
app.use( (req, res, next) => {
  logger.info(req.originalUrl);
  next();
});

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use(routes);

// Error handling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
