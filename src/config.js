/**
 * DotEnv Environment Configuration 
 * @module config
 * @requires dotenv
 */

const dotenv = require('dotenv');
 
const result = dotenv.config();

// Error Catching for the .env reading:
if (result.error) {
    throw result.error;
}
else {
    console.log("Sucessfully Loaded Environment Config Params");
}

/**
 * Using the dotenv package to extract environment params
 * @const
 * @type {object} 
 */
const { parsed : envs } = result;
//console.log(envs);

module.exports = envs;