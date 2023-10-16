const { checkSchema } = require("express-validator");
const UserService = require("../services/user");

const userSchemaValidator = [
  checkSchema({
    first_name: {
      required: true,
      isLength: {
        options: {
          min: 2,
          max: 30,
        },
      },
    },
    last_name: {
      optional: {
        options: {
          nullable: true,
        },
      },
      isLength: {
        optional: {
          nullable: true,
        },
        options: {
          min: 2,
          max: 30,
        },
      },
    },
    email: {
      required: true,
      isEmail: true,
      normalizeEmail: true,
      custom: {
        options: async (value) => {
          const existingUser = await UserService.getUserByEmail(value);

          if (existingUser) {
            return Promise.reject("user already exits");
          }
          return Promise.resolve("new user");
        },
      },
    },
    password: {
      required: true,
      isLength: {
        options: {
          min: 8,
        },
      },
    },
  }),
];

const signinSchemaValidator = checkSchema({
  email: {
    required: true,
    isEmail: true,
    normalizeEmail: true,
  },
  password: {
    required: true,
  },
});

module.exports = {
  userSchemaValidator,
  signinSchemaValidator,
};
