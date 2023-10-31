const express = require("express");
const { userAuth } = require("../middlerwares/auth");
const { getComments, addComment } = require("../controllers/comments");
const {
  CommentSchemaValidator,
  paramsSanitizer,
} = require("../validations/comments");
const validate = require("../utils/validationResult");

const router = express.Router();

router.get("/:news_id(\\d+)/comments", userAuth, paramsSanitizer, getComments);
router.post(
  "/:news_id(\\d+)/comments/add",
  userAuth,
  CommentSchemaValidator,
  paramsSanitizer,
  validate,
  addComment
);
module.exports = router;
