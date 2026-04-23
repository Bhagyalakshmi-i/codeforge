const Problem = require("../models/Problem");


// ===================================
// GET ALL PROBLEMS
// ===================================
exports.getProblems = async (req, res) => {

  try {

    const problems = await Problem.find();

    res.json(problems);

  } catch (error) {

    res.status(500).json({
      message: "Server error"
    });

  }

};


// ===================================
// CREATE NEW PROBLEM
// ===================================
exports.createProblem = async (req, res) => {

  try {

    const {
      title,
      description,
      difficulty,
      topic,
      language,
      solution,
      explanation,
      youtube,
      tags
    } = req.body;

    const problem = await Problem.create({

      title,
      description,
      difficulty,
      topic,
      language,
      solution,
      explanation,
      youtube,
      tags

    });

    res.status(201).json({
      message: "Problem uploaded successfully",
      problem
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};