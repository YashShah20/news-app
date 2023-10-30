const UpvotesService = require("../services/upvote");
const getUpvote = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;

    const upvote = await UpvotesService.getUserUpvoteByNewsId(news_id, user_id);
    res.send(upvote);
  } catch (error) {
    next(error);
  }
};

const upvoteNews = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;

    const upvote = await UpvotesService.upvoteNewsById(news_id, user_id);
    res.send(upvote);
  } catch (error) {
    next(error);
  }
};

const deleteUpvote = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;

    const upvote = await UpvotesService.deleteUpvoteByNewsId(news_id, user_id);
    res.send(upvote);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUpvote,
  upvoteNews,
  deleteUpvote,
};
