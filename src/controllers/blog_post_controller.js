/** 
 * Blog Posts Route Controllers
 * @module controllers/blog_post_controller
 * @requires body-parser
 * @requires models/blog_model
 */

/**
 * Body Parser MiddleWare
 * @const
 */
const bodyParser = require("body-parser");

/**
 * Mongoose ORM models:
 * @const
 */
const Post = require("../models/blog_model");

/**
 * An object serving as a container for all of the callback functions 
 * for blog post HTTP routes. Serves as a controller for all blog post 
 * API routes.
 */
const blogpostController = {
    
    /**
     * The route callback function that queries the database for all instances of the
     * Post db model, seralizes them into JSON format and attaches them to the HTTP
     * response.
     * 
     * It excludes the full body html content of the Post data model as it is intended
     * to serve an endpoint that queries blog post thumbnail data.
     * 
     * @param {e.Request} req - The HTTP request recieved from the endpoint.
     * @param {e.Response} res - the HTTP response sent to the client.
     * @returns {void}
     */
    async all (req, res) {

        try {

            // If no number of specific query params are provided query all: 
            if (!req.query.numPosts) {
                // Querying all blog posts from db:
                const posts = await Post.find().sort("-createdOn");

                // Returning all posts through response:
                await res.json(posts);    
            }

            // Querying specific number of posts based on url params:
            else {
                postLimit = parseInt(req.query.numPosts);
                const posts = await Post.find().sort("-createdOn").limit(postLimit);
                
                // Returning all posts through response:
                await res.json(posts);    

            }

        }
        
        catch (err) {
            res.json({ message : err });
        }    
    },

    /**
     * The route callback function that queries the database for all instances of the Post
     * db model that contain a specific category param {category}. The seralized result
     * is attached to the HTTP response.
     * 
     * It excludes the full body html content of the Post data model as it is intended
     * to serve an endpoint that queries specific post categories thumbnail data.
     * 
     * @param {e.Request} req - The HTTP request recieved from the endpoint assumed to be a GET.
     * @param {e.Response} res - the HTTP response sent to the client.
     * @returns {void}
     */
    async byCategory (req, res) {

        // Extracting the search parameters from the URL:
        const postCategory = req.params.categoryName;
        
        try {
            // Custom QuerySet based on url params:
            const posts = await Post.find({category:postCategory}).select("-content");
            res.json(posts);
        }
        catch (err) {
            res.json({ message:err });
        }

    },

    /**
     * The route callback function that queries the database for a specific Post instance
     * based on the {slug} model parameter. The seralized result is then attached to the
     * HTTP response.
     * 
     * The method queries and attaches the full Post model as it is intended to serve an
     * endpoint that queries a specific blog post as opposed to thumbnail data. 
     * 
     * @param {e.Request} req - The HTTP request recieved from the endpoint assumed to be a GET.
     * @param {e.Response} res - the HTTP response sent to the client.
     * @returns {void}
     */
    async bySlug (req, res) {

        // Querying the database for unique post:
        try {

            // If no number of specific query params are provided query all: 
            if (!req.query.numPosts) {
                // Querying all blog posts from db:
                const posts = await Post.find({slug : req.params.postSlug}).sort("-createdOn");

                // Returning all posts through response:
                await res.json(posts);    
            }

            // Querying specific number of posts based on url params:
            else {
                postLimit = parseInt(req.query.numPosts);
                const posts = await Post.find({slug : req.params.postSlug}).sort("-createdOn").limit(postLimit);
                
                // Returning all posts through response:
                await res.json(posts);    

            }
        }

        catch (err) {
            res.json({ message : err }); 
        } 
    },

    /**
     * The route callback function that contains the logic to create a Post db model instance
     * and insert said instance into the database. 
     * 
     * It is intended to serve an endpoint that recieves an HTTP POST request containing all
     * the necessary Post model fields as request.body parameters. It is these params that
     * are used to create the Post database model instance.
     * 
     * The method assumes the following POST request parameters:
     * {
     *  title:
     *  createdOn:
     *  description:
     *  url: 
     *  html_content:
     * category:
     * }
     * 
     * The URL is a github url to a ipython notebook that the controller pulls down from github.
     * The .ipynb notebook extracted form github is then converted into RAW html via nbconveter.
     * That raw HTML is then stored in the database as the body content.
     * 
     * 
     * @param {e.Request} req - The HTTP request recieved from the endpoint assumed to be a POST.
     * @param {e.Response} res - the HTTP response sent to the client.
     * @returns {void}
     */
    async create (req, res) {
        try {
            
            // Extracting the HTTP POST request body content:
            const reqContent = {
                title : req.body.title,
                createdOn : Date.now(),
                description : req.body.description,
                git_url : req.body.git_url,
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
    
    /**
     * The route callback function that contains the logic to update a Post db model instance
     * based on its unique {_id} param as specified by the URL.
     * 
     * It is intended to serve an endpoint that recieves an HTTP PUT request containing all
     * the necessary Post model fields to be updated as request.body parameters. 
     * 
     * @param {e.Request} req - The HTTP request recieved from the endpoint assumed to be a PUT.
     * @param {e.Response} res - the HTTP response sent to the client.
     * @returns {void}
     */
    async update (req, res) {

        try {

            // Extracting the unique id from the request:
            const postId = req.params.id;

            // Finding the product in the database to be updated:
            const post = await Post.findOneAndUpdate({_id : postId}, {
                
                // Performing an update of the model:
                title: req.body.title,
                description: req.body.description,
                category : req.body.category,
                git_url: req.body.git_url
            }, {new : true})

            res.json(post); 
        }

        catch (err) {
            res.json({ message : err });
        }
    },

    /**
     * The route callback function that contains the logic to delete a Post db model instance
     * from the database based on its unique {_id} param as specified by the URL.
     * 
     * It is intended to serve an endpoint that recieves an HTTP PUT request containing all
     * the necessary Post model fields to be updated as request.body parameters. 
     * 
     * @param {e.Request} req - The HTTP request recieved from the endpoint assumed to be a DELETE.
     * @param {e.Response} res - the HTTP response sent to the client.
     * @returns {void}
     */
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