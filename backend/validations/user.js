const { checkSchema } = require("express-validator");
const UserService = require("../services/user");
const { compare } = require("../utils/bcrypt");

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

const changePasswordSchemaValidator = checkSchema({
  password: {
    required: {
      bail: true,
    },
    custom: {
      options: async (value, { req }) => {
        try {
          const { email } = req.user;
          const user = await UserService.getUserByEmail(email);

          const isValidPassword = await compare(value, user.password);

          if (!isValidPassword) {
            return Promise.reject("invalid current password");
          }

          return Promise.resolve("valid current password");
        } catch (error) {
          return Promise.reject("invalid current password");
        }
      },
    },
  },
  new_password: {
    required: true,
    isLength: {
      options: {
        min: 8,
      },
    },
  },
});
module.exports = {
  userSchemaValidator,
  signinSchemaValidator,
  changePasswordSchemaValidator,
};
