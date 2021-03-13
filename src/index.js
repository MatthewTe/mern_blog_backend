// Internal packages:
const config = require("./config");
const app = require("./app");

// TODO:
// Add unit testing for Post API endpoints.
// Setup JSDOC API doc generation and install.

// Launch app to listen to specified port:  
app.listen(config.PORT, () => {
     console.log("Running Server on port " + config.PORT);
});