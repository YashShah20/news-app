const { checkSchema } = require("express-validator");
const { isImage } = require("../utils/image");

const newsSchemaValidator = checkSchema({
  title: {
    notEmpty: true,
    isLength: {
      options: {
        min: 10,
      },
    },
  },
  content: {
    notEmpty: true,
    isLength: {
      options: {
        min: 10,
        max: 500,
      },
    },
  },
  image_url: {
    notEmpty: true,
    isURL: {
      bail: true,
    },
    custom: {
      options: isImage,
    },
  },
  tags: {
    notEmpty: true,
  },
});

module.exports = {
  newsSchemaValidator,
};
