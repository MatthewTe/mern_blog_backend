const dotenv = require('dotenv');

const result = dotenv.config();

// Error Catching for the .env reading:
if (result.error) {
    throw result.error;
}
else {
    console.log("Sucessfully Loaded Environment Config Params");
}

// dotenv environment variables:
const { parsed : envs } = result;
//console.log(envs);

module.exports = envs;