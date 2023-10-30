const CommentsService = require("../services/comments");

const getComments = async (req, res, next) => {
  try {
    const { news_id } = req.params;
    const { parent_id } = req.query;

    const comments = await CommentsService.getComments(news_id, parent_id);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { text } = req.body;
    const { news_id } = req.params;
    const { parent_id } = req.query;

    const comment = await CommentsService.addComment(
      news_id,
      user_id,
      text,
      parent_id
    );

    res.send(comment);
  } catch (error) {
    next(error);
  }
};

module.exports = { getComments, addComment };
