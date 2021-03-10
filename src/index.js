// External module:
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Internal packages:
const {PORT, MONGODB_URI} = require("./config");
const blogRoutes = require("./routes/blogRoutes");

// TODO: Add Documentation for all express modules/functions;
// TODO: Add AuthO authentication to protect all API routes;

const app = express();

// Middleware:
app.use(bodyParser.json());
app.use("/api", blogRoutes);

// Send message for default URL
app.get('/', (req, res) => { 
    res.send("This is the Home Page.")
});

// Database Connection:
mongoose.connect(
    MONGODB_URI, {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
});

// Launch app to listen to specified port:  
app.listen(PORT, () => {
     console.log("Running Server on port " + PORT);
});