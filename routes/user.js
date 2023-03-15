const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  getAppliedJobs,
  getPublishedJobs,
  getUsers,
  adminDeleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/profile").get(isAuthenticatedUser, getUserProfile);
router
  .route("/jobs/applied")
  .get(isAuthenticatedUser, authorizeRoles("user"), getAppliedJobs);
router
  .route("/jobs/published")
  .get(
    isAuthenticatedUser,
    authorizeRoles("employer", "admin"),
    getPublishedJobs
  );

router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/profile/update").put(isAuthenticatedUser, updateUser);

router.route("/profile/delete").delete(isAuthenticatedUser, deleteUser);

// Admin only routes
router
  .route("/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);

router
  .route("/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), adminDeleteUser);

module.exports = router;
