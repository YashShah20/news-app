const express = require("express");

const { signin, signup, changePassword } = require("../controllers/user");
const {
  signinSchemaValidator,
  userSchemaValidator,
  changePasswordSchemaValidator,
} = require("../validations/user");
const validate = require("../utils/validationResult");
const { userAuth } = require("../middlerwares/auth");

const router = express.Router();

router.post("/signin", signinSchemaValidator, validate, signin);
router.post("/signup", userSchemaValidator, validate, signup);
router.put(
  "/change-password",
  userAuth,
  changePasswordSchemaValidator,
  validate,
  changePassword
);

module.exports = router;
