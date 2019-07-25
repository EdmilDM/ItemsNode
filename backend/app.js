const express = require('express');
const bodyParser = require('body-parser');

const env = require('./config/env');
const logger = require('./config/winston');
const routes = require('./routes/index');
require('./database/connector'); // Stablish database connection.

const app = express();
const port = env.PORT;

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

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
