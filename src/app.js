/**
 * The endpoint for the Express Application
 * @module app
 * @requires express 
 * @requires mongoose
 * @requires body-parser
 * @requires config
 * @requires routes/blog_routes
 * @requires authentication/user_auth
 */

// Third Party Imports:
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Internal Imports:
const config = require("./config");
const blogRoutes = require("./routes/blog_routes");
const routePremissions = require("./authentication/route_permissions");
/**
 * Express Application
 * @const
 */
const app = express();

/**
 * Creating a database connection to the MongoDB from config params:
 * @function
 */
mongoose.connect(
    config.MONGODB_URI, {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
});

// Adding Application MiddleWare:
/**
 * Body-Parser Middleware
 * @function
 */
app.use(bodyParser.json());
/**
 * Middleware adding route permsissons and authentication middleware
 * @function
 */
app.use(routePremissions); 
/**
 * Adding API router endpoints to application as "/api"
 * @function
 */
app.use("/api", blogRoutes);
/**
 * Default Base URL Route (A placeholder for potential other routes)
 * @function
 */
app.get('/', (req, res) => { 
    res.send("This is the Home Page.")
});

module.exports = app;