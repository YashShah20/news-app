const { checkSchema } = require("express-validator");
const CommentSchemaValidator = checkSchema({
  news_id: {
    in: "params",
    notEmpty: true,
    isInt: true,
    toInt: true,
    custom: {
      options: (value) => {
        return true;
      },
    },
  },
  text: {
    notEmpty: true,
    isLength: {
      options: {
        min: 2,
        max: 500,
      },
    },
    escape: true,
  },
});

const paramsSanitizer = checkSchema({
  parent_id: {
    customSanitizer: {
      options: (value) => {
        return parseInt(value) || null;
      },
    },
  },
});
module.exports = {
  CommentSchemaValidator,
  paramsSanitizer,
};
