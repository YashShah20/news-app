const express = require("express");
const {
  getNewsByCity,
  addNews,
  updateNews,
  deleteNews,
  getNewsDetails,
} = require("../controllers/news");
const { userAuth } = require("../middlerwares/auth");

const router = express.Router();

router.get("/", userAuth, getNewsByCity);
router.get("/details/:news_id", userAuth, getNewsDetails);
router.post("/add", userAuth, addNews);
router.put("/update/:news_id", userAuth, updateNews);
router.delete("/delete/:news_id", userAuth, deleteNews);

module.exports = router;
