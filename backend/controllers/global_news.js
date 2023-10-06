const GlobalNewsService = require("../services/global_news");

const getNews = async (req, res, next) => {
  try {
    const { page } = req.query;
    const news = await GlobalNewsService.getNews(page);

    res.send(news);
  } catch (error) {
    next(error);
  }
};

const getNewsByCategory = async (req, res, next) => {
  try {
    const { page } = req.query;
    const { tag } = req.params;

    const news = await GlobalNewsService.getNewsByCategory(tag, page);

    res.send(news);
  } catch (error) {
    next(error);
  }
};

module.exports = { getNews, getNewsByCategory };
