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
     * All of the blog post's main content formatted in markdown stored
     * as a string.
     */
    markdown: {
        type: String
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

// Creating MongoDB model: 
const Post = mongoose.model("Post", postSchema);

module.exports = Post;