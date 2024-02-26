const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rating: Number,
  content: String,
  author_id: String,
  game_id: String,
});
const ReviewModel = mongoose.model("Review", ReviewSchema);

module.exports = ReviewModel;
