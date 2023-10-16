const express = require("express");

const { signin, signup } = require("../controllers/user");
const {
  signinSchemaValidator,
  userSchemaValidator,
} = require("../validations/user");
const validate = require("../utils/validationResult");

const router = express.Router();

router.post("/signin", signinSchemaValidator, validate, signin);
router.post("/signup", userSchemaValidator, validate, signup);

module.exports = router;
