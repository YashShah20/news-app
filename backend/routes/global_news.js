const express = require("express");
const { getNews, getNewsByCategory } = require("../controllers/global_news");

const router = express.Router();

router.get("/", getNews);
router.get("/:tag", getNewsByCategory);

module.exports = router;
