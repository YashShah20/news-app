const express = require("express");
const {
  getNewsTags,
  addNewsTags,
  deleteNewsTags,
} = require("../controllers/news_tag");
const { userAuth } = require("../middlerwares/auth");

const router = express.Router();

router.get("/:news_id/tags", userAuth, getNewsTags);
router.post("/:news_id/tags/add", userAuth, addNewsTags);
router.delete("/:news_id/tags/delete", userAuth, deleteNewsTags);

module.exports = router;
