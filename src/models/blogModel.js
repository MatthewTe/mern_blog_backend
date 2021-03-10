// Importing MongoDB ORM libraries:
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

// Initalzing Plugins:
mongoose.plugin(slug);

// Blog Schema: 
const postSchema = new mongoose.Schema ({
    title: {
        type: String,
        unique: true,
    },
    createdOn: {
        type: Date,
    },
    description: {
        type: String
    },
    markdown: {
        type: String
    },

    category: {
        type: String
    },

    slug: {
        type: String,
        slug: "title",
        unique: true
    }
});

// Creating MongoDB model: 
const Post = mongoose.model("Post", postSchema);

module.exports = Post;