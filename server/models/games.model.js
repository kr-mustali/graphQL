const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: String,
  platform: Array,
});

const GameModel = mongoose.model("Game", GameSchema);

module.exports = GameModel;
