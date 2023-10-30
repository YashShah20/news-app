const UpvotesService = require("../services/upvote");
const { checkSchema } = require("express-validator");

const upvoteSchemaValidation = checkSchema({
  news_id: {
    in: "params",
    notEmpty: true,
    isInt: {
      bail: true,
    },
    toInt: true,
    custom: {
      options: async (value, { req }) => {
        const { id: user_id } = req.user;
        const previousUpvote = await UpvotesService.getUserUpvoteByNewsId(
          value,
          user_id
        );

        if (!previousUpvote) {
          return Promise.resolve("user can upvote the news");
        }
        return Promise.reject("user already upvoted the news");
      },
    },
  },
});

module.exports = {
  upvoteSchemaValidation,
};
