const express = require("express");
const router = express.Router()
const commentController = require("../controllers/comments");


//Post Routes - simplified for now


router.post("/createComment/:id", commentController.createComment);
//create a route that is passing both the comment id and cthe post id
router.delete("/deleteComment/:postId/:commentId", commentController.deleteComments);

module.exports = router;
