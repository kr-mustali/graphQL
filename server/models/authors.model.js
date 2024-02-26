const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: String,
  verified: Boolean,
});
const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;
