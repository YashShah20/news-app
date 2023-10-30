const express = require("express");
const { userAuth } = require("../middlerwares/auth");
const {
  upvoteNews,
  deleteUpvote,
  getUpvote,
} = require("../controllers/upvote");
const { upvoteSchemaValidation } = require("../validations/upvote");
const validate = require("../utils/validationResult");

const router = express.Router();

router.get("/:news_id/", userAuth, getUpvote);

router.post(
  "/:news_id",
  userAuth,
  upvoteSchemaValidation,
  validate,
  upvoteNews
);

router.delete("/:news_id/delete", userAuth, deleteUpvote);
module.exports = router;
