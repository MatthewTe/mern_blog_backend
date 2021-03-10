// External module:
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Internal packages:
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// Middleware:
app.use(bodyParser.json());
app.use("/api", blogRoutes);


// Setup server port
var port = process.env.PORT || 8000;

// Send message for default URL
app.get('/', (req, res) => { 
    res.send("This is the Home Page.")
});

// Database Connection:
mongoose.connect(
    'mongodb://localhost:27017/express_blog', {
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
});

// Launch app to listen to specified port:  
app.listen(port, () => {
     console.log("Running Server on port " + port)
});