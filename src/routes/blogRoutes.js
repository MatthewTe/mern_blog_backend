// Importing API express API packages:
const express = require("express");
const router = express.Router();

// Importing blog post controllers:
const blogpostController = require("../controllers/blogpostController")

// Blog post GET request routes:
router.get("/blog/posts", blogpostController.all);
router.get("/blog/post/:postSlug", blogpostController.bySlug);
router.get("/blog/category-:categoryName", blogpostController.byCategory);

// Blog post POST request routes:
router.post("/blog", blogpostController.create);

// Blog post PUT request routes:
router.put("/blog/:id", blogpostController.update);

// Blog post DELETE request routes:
router.delete("/blog/:id", blogpostController.remove);

// Exporting the express router:
module.exports = router;