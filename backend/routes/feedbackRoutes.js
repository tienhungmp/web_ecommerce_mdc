const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

router.route("/")
  .get(authenticateUser, getAllFeedbacks)
  .post(authenticateUser, createFeedback);

router.route("/:id")
  .get(authenticateUser, getSingleFeedback)
  .patch(authenticateUser, updateFeedback)
  .delete(authenticateUser, deleteFeedback);

module.exports = router;
