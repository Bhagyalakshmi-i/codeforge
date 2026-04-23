const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  topic: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  solution: {
    type: String,
    required: true
  },

  language: {
    type: String
  },

  explanation: {
    type: String
  },

  youtube: {
    type: String
  },

  tags: {
    type: String
  },

  createdBy: {
    type: String
  },

  likes: {
    type: Number,
    default: 0
  },

  views: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "Problem",
  problemSchema
);