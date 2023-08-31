const cloudinary = require("../middleware/cloudinary");
const Review = require("../models/Review");
const Comment = require("../models/Comment")
const Recommend = require("../models/Recommend")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const reviews = await Review.find({ user: req.user.id });
      res.render("profile.ejs", { reviews: reviews, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getForm: async (req, res) => {
    try {
      res.render("form.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getRecommends: async (req, res) => {
    try {
      const reviews = await Recommend.find({ user: req.user.id }).populate('review');
      console.log(reviews)
      res.render("recommends.ejs", {  reviews: reviews, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const review = await Review.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { review: review });
    } catch (err) {
      console.log(err);
    }
  },
  getReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      //no mods made here except from chainging the sorting order of the comments from descnto asc so older comments show at the top
      const comments = await Comment.find({reviewId:req.params.id}).sort({createdAt:"asc"}).lean()
      
      res.render("review.ejs", { review: review, user:req.user, comments: comments});
      console.log(comments)
    } catch (err) {
      console.log(err);
    }
  },
  createReview: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Review.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        review: req.body.review,
        upvotes: 0,
        downvotes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  recommendReview: async (req, res) => {
    try {
      // Upload image to cloudinary
     

      await Recommend.create({
        user: req.user.id,
        review: req.params.id,
      });
      console.log("Recommendation has been added!");
      res.redirect(`/review/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },


  upvoteReview: async (req, res) => {
    try {
      await Review.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { upvotes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/review/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },

  downvoteReview: async (req, res) => {
    try {
      await Review.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { upvotes: -1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/review/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  
  
  deleteReview: async (req, res) => {
    try {
      // Find post by id
      let review = await Review.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(review.cloudinaryId);
      // Delete post from db
      await Review.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
