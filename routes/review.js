const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const reviewController = require("../controllers/review");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, reviewController.getReview);

router.post("/createReview", upload.single("file"), reviewController.createReview)

router.post("/recommendReview/:id", reviewController.recommendReview)

router.put("/upvoteReview/:id", reviewController.upvoteReview)

router.put("/downvoteReview/:id", reviewController.downvoteReview)

router.delete("/deleteReview/:id", reviewController.deleteReview);

module.exports = router;
