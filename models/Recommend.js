const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema({
  
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Recommendation", RecommendationSchema);
