const express = require("express");
const { addTag, getTags, updateTag, deleteTag } = require("../controllers/tag");

const router = express.Router();

router.get("/", getTags);
router.post("/add", addTag);
router.put("/update/:id", updateTag);
router.delete("/delete/:id", deleteTag);

module.exports = router;
