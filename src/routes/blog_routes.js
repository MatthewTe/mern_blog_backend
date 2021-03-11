/**
 * Blog Post API Endpoints
 * @module routes/blog_routes
 * @requires express 
 * @requires controllers/blog_post_controller
 */

/**
 * Express module
 * @const
 */
const express = require("express");

/**
 * Blog router controllers
 * @const
 */
const blogpostController = require("../controllers/blog_post_controller");

/**
 * Express Router that mounts Blog Post Enpoints
 * @type {object}
 * @const
 * @namespace postsRouter
 */
const router = express.Router();

// Blog post GET request routes:

/**
 * Route providing all blog post thumbnails
 * @function 
 * @memberof module:routes/blog_routes~postsRouter
 * @inner
 * @param {String} path - Express URL Path
 * @param {module:controllers/blog_post_controller~blogpostController.all} - Express callback middleware.
 */
router.get("/blog/posts", blogpostController.all);
/**
 * Route providing all blog post content associated with a specific Post slug.
 * @function 
 * @memberof module:routes/blog_routes~postsRouter
 * @inner
 * @param {String} path - Express URL Path
 * @param {module:controllers/blog_post_controller~blogpostController.bySlug} - Express callback middleware.
 */
router.get("/blog/post/:postSlug", blogpostController.bySlug);
/**
 * Route providing all blog post thumbnails associated with a specific category.
 * @function 
 * @memberof module:routes/blog_routes~postsRouter
 * @inner
 * @param {String} path - Express URL Path
 * @param {module:controllers/blog_post_controller~blogpostController.byCategory} - Express callback middleware.
 */
router.get("/blog/category-:categoryName", blogpostController.byCategory);

// Blog post POST request routes:

/**
 * Route facilitating the insertion of a blog post to the database.
 * @function 
 * @memberof module:routes/blog_routes~postsRouter
 * @inner
 * @param {String} path - Express URL Path
 * @param {module:controllers/blog_post_controller~blogpostController.create} - Express callback middleware.
 */
router.post("/blog", blogpostController.create);

// Blog post PUT request routes:

/**
 * Route facilitating the updating of a blog post instance based on model _id.
 * @function 
 * @memberof module:routes/blog_routes~postsRouter
 * @inner
 * @param {String} path - Express URL Path
 * @param {module:controllers/blog_post_controller~blogpostController.update} - Express callback middleware.
 */
router.put("/blog/:id", blogpostController.update);

// Blog post DELETE request routes:

/**
 * Route facilitating the removal of a blog post instance based on model _id.
 * @function 
 * @memberof module:routes/blog_routes~postsRouter
 * @inner
 * @param {String} path - Express URL Path
 * @param {module:controllers/blog_post_controller~blogpostController.remove} - Express callback middleware.
 */
router.delete("/blog/:id", blogpostController.remove);

// Exporting the express router:
module.exports = router;