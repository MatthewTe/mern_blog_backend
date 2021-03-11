// External module:
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Internal packages:
const {PORT, MONGODB_URI} = require("./config");
const blogRoutes = require("./routes/blog_routes");

// Configure the application in seperate app.js file and only have app.listen() in index.js.
// Add unit testing for Post API endpoints.
// Add unique permission system that locks post and update endpoints behined user auth.

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