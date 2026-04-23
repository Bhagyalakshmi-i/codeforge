const express = require("express");

const router = express.Router();

const {
  getProblems,
  createProblem
} = require("../controllers/problemController");


// GET ALL PROBLEMS
router.get("/", getProblems);


// CREATE PROBLEM
router.post("/", createProblem);

module.exports = router;