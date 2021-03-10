const bodyParser = require("body-parser");

// Importing blogPost DB model:
const Post = require("../models/blogModel");

//TODO: Add Proper Documenation to each of the functions & object.

// blog post controller object:
const blogpostController = {
    
    // Function that returns all blog posts in JSON:
    async all (req, res) {

        try {

            // Querying all blog posts from db:
            const posts = await Post.find().select("-markdown");

            // Returning all posts through response:
            res.json(posts);    
        }
        
        catch (err) {
            res.json({ message : err });
        }    
    },

    // Function that returns all blog posts in a specific category: 
    async byCategory (req, res) {

        // Extracting the search parameters from the URL:
        const postCategory = req.params.categoryName;
        
        try {
            // Custom QuerySet based on url params:
            const posts = await Post.find({category:postCategory}).select("-markdown");
            res.json(posts);
        }
        catch (err) {
            res.json({ message:err });
        }

    },

    // Function that allows a single bog post to be queried:
    async bySlug (req, res) {

        // Querying the database for unique post:
        try {

            // Database query:
            const post = await Post.findOne({slug : req.params.postSlug});
            res.json(post);
        }

        catch (err) {
            res.json({ message : err }); 
        } 
    },

    // Function that POSTS a blog object to be inserted into the database:
    async create (req, res) {
        try {

            // Extracting the HTTP POST request body content:
            const reqContent = {
                title : req.body.title,
                createdOn : Date.now(),
                description : req.body.description,
                markdown : req.body.markdown,
                category : req.body.category
            };

            // Trying to add data to the database:
            const post = new Post(reqContent);
            const savedPost = await post.save();

            res.json(savedPost);
        
        }

        catch (err) {
            res.json({ message: err }); 
        }
    },
    
    // Function that updates an existing model:
    async update (req, res) {

        try {

            // Extracting the unique id from the request:
            const postId = req.params.id;

            // Finding the product in the database to be updated:
            const post = await Post.findOneAndUpdate({_id : postId}, {
                
                // Performing an update of the model:
                title: req.body.title,
                description: req.body.description,
                markdown: req.body.markdown,
                category : req.body.category
            }, {new : true})

            res.json(post); 
        }

        catch (err) {
            res.json({ message : err });
        }
    },

    // Function that deletes an existing Post model:
    async remove (req, res) {

        // MongoDB model id from url:
        const postId = req.params.id;
        
        // Searching DB for model instance:
        Post.findByIdAndRemove({"_id": postId}, (err, data) => {
            if (err) {
                res.json({ message: err });
            }
            else {
                res.json( {removed : data});
            }
        });

    }
}; 


module.exports = blogpostController;