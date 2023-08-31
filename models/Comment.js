const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
    required: true
  },
//new field to hold mongoose object id that will be used to check if a user is logged in 
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  //added a new field to hold username of the commenters
  createdBy:{
    type: String,
    ref: "User",
    required: true
  },

  reviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
