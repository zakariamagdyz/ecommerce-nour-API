const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A category must have a name"],
    trim: true,
  },

  photo: {
    type: String,
    required: [true, "Please provide the link to the photo"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
