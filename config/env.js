/**
 * File that exports environment variables
 */

const dotenv = require('dotenv');
const result = dotenv.config();
const {parsed: envs} = result;
module.exports = envs;
