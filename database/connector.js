const mongoose = require('mongoose');

const logger = require('../config/winston');
const env = require('../config/env');

const uri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`;

mongoose.connect(uri, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', (err) => logger.error('Error connection to database.', err));
db.once('open', () => logger.info('Connection to database successful.'));

module.exports = db;
