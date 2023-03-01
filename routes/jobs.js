const express = require("express");
const router = express.Router();

// Importing jobs controller methods
const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);

router.route("/job/new").post(newJob);

router.route("/job/:id").put(updateJob);

router.route("/job/:id").delete(deleteJob);

module.exports = router;
