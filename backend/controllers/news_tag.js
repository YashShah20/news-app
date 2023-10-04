const NewsTagService = require("../services/news_tag");
const NewsService = require("../services/news");

const getNewsTags = async (req, res, next) => {
  try {
    const { news_id } = req.params;

    const tags = await NewsTagService.getNewsTagsByNewsId(news_id);

    res.send(tags);
  } catch (error) {
    next(error);
  }
};

const addNewsTags = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;

    const { tags } = req.body;

    const news_creator = await NewsService.getNewsCreatorId(news_id);
    if (user_id != news_creator) {
      res.status(403);
      throw new Error("unauthorized to update news");
    }

    const news_tags = await NewsTagService.addNewsTags(news_id, tags);

    res.send(news_tags);
  } catch (error) {
    next(error);
  }
};

const deleteNewsTags = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;

    const { tags } = req.body;

    const news_creator = await NewsService.getNewsCreatorId(news_id);
    if (user_id != news_creator) {
      res.status(403);
      throw new Error("unauthorized to update news");
    }

    const news_tags = await NewsTagService.deleteNewsTagsByNewsId(
      news_id,
      tags
    );

    res.send(news_tags);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNewsTags,
  addNewsTags,
  deleteNewsTags,
};
