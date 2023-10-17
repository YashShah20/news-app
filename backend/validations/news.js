const { checkSchema } = require("express-validator");
const { isImage } = require("../utils/image");

const newsSchemaValidator = checkSchema({
  title: {
    required: true,
    isLength: {
      options: {
        min: 10,
      },
    },
  },
  content: {
    required: true,
    isLength: {
      options: {
        min: 10,
        max: 500,
      },
    },
  },
  image_url: {
    required: true,
    isURL: {
      bail: true,
    },
    custom: {
      options: isImage,
    },
  },
  tags: {
    required: true,
  },
});

module.exports = {
  newsSchemaValidator,
};
