/**
 * MongoDB blog post ORM model
 * @module models/blog_model
 * @requires mongoose
 * @requires mongoose-slug-generator
 */

/**
 * Mogoose MongoDB ORM
 * @const
 */
const mongoose = require("mongoose");
/**
 * Mongoose slug plugin
 * @const
 */
const slug = require("mongoose-slug-generator");
/**
 * axios request library
 * @const
 */
const axios = require("axios");

// Adding plugins:
mongoose.plugin(slug);

/**
 * The Schema describing the layout for the Mongoose Post DB Model
 * @type {mongoose.Schema} 
 */
const postSchema = new mongoose.Schema ({
    /**
     * The title/header of the post 
     */
    title: {
        type: String,
        unique: true,
    },
    /**
     * The date that the post was created. Stored in UNIX time.
     */
    createdOn: {
        type: Date,
    },
    /**
     * The thumbnail description of the blog post content.
     */
    description: {
        type: String
    },
    /**
     * The url to the .ipynb file stored on github:
     */
    git_url: {
        type: String
    },
    /**
     * All of the blog post's main content stored as a string of HTML after 
     * being converted from the url param's ipynb.
     */
    content: {
        type: String, 
        default: undefined
    },
    /**
     * The category that the post belongs to (what type of content is it) 
     */
    category: {
        type: String
    },
    /**
     * The slug generated from a posts unique title. Used for uniquely identifying
     * specific posts. 
     */
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
});

/**
 * The method takes the url to the raw HTML content, pulls down the notebook HTML via
 * axios and sets the HTML data to the {content} parameter. 
 * 
 * @function
 */
postSchema.pre("save", async function() {
    
    try {

        // TODO: Only execute GET to github if content is empty
        if (typeof this.content == "undefined") {
        
            // Extracting the notebook html from github:
            const response = await axios.get(this.git_url);
            const notebook_html = await response.data;

            // Setting the HTML content to the Post Model:
            this.content = notebook_html;
            console.log(this.content);
        }

    }
    catch (e) {
        console.log(e);
    }  
});

// Creating MongoDB model: 
const Post = mongoose.model("Post", postSchema);



module.exports = Post;