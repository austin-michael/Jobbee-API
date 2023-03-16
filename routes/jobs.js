const express = require("express");
const router = express.Router();

// Importing jobs controller methods
const {
  getJobs,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  getJob,
  jobStats,
  applyToJob,
} = require("../controllers/jobsController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/jobs").get(isAuthenticatedUser, getJobs);
router.route("/job/:id/:slug").get(isAuthenticatedUser, getJob);
router
  .route("/jobs/:zipcode/:distance")
  .get(isAuthenticatedUser, getJobsInRadius);
router.route("/stats/:topic").get(isAuthenticatedUser, jobStats);

router
  .route("/job/new")
  .post(isAuthenticatedUser, authorizeRoles("employer", "admin"), newJob);

router
  .route("/job/:id/apply")
  .put(isAuthenticatedUser, authorizeRoles("user"), applyToJob);

router
  .route("/job/:id")
  .put(isAuthenticatedUser, authorizeRoles("employer", "admin"), updateJob);

router
  .route("/job/:id")
  .delete(isAuthenticatedUser, authorizeRoles("employer", "admin"), deleteJob);

module.exports = router;
