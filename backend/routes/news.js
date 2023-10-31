const express = require("express");
const {
  getNewsByCity,
  addNews,
  updateNews,
  deleteNews,
  getNewsDetails,
} = require("../controllers/news");
const { userAuth } = require("../middlerwares/auth");
const { newsSchemaValidator } = require("../validations/news");
const validate = require("../utils/validationResult");

const router = express.Router();

router.get("/", userAuth, getNewsByCity);
router.get("/:news_id(\\d+)", userAuth, getNewsDetails);
router.post("/add", userAuth, newsSchemaValidator, validate, addNews);
router.put("/update/:news_id(\\d+)", userAuth, updateNews);
router.delete("/delete/:news_id(\\d+)", userAuth, deleteNews);

module.exports = router;
