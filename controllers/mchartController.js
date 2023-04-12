const Question = require("../models/machartModal");

const mongoose = require("mongoose");

exports.saveQuestions = async (req, res, next) => {
  const options =
    req.body.options instanceof Array ? req.body.options : ["yes", "no"];
  const question = new Question({
    question: req.body.question,
    options: options,
  });

  try {
    const newQuestion = await question.save();
    const responseData = {
      question: newQuestion.question,
      options: newQuestion.options,
    };
    res.status(201).json(responseData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//you have to pass query for Feedback and Skills that sends question according to that
exports.getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
