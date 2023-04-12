const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        // Allow an array of strings or a single string
        return Array.isArray(v) || typeof v === "string";
      },
      message: "Options must be an array of strings or a single string",
    },
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;

