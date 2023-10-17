const GlobalNewsService = require("../services/global_news");
const base64ToASCII = (text) => Buffer.from(text, "base64").toString("ascii");
const dayjs = require("dayjs");
const getNews = async (req, res, next) => {
  try {
    const { page } = req.query;
    const news = await GlobalNewsService.getNews(page);

    const news_with_decoded_title = news.map((news_item) => ({
      ...news_item,
      title: base64ToASCII(news_item.title),
      content: base64ToASCII(news_item.content),
      created_on: dayjs(+news_item.created_on).format("dddd - DD MMMM, YYYY"),
    }));
    res.send(news_with_decoded_title);
  } catch (error) {
    next(error);
  }
};

const getNewsByCategory = async (req, res, next) => {
  try {
    const { page } = req.query;
    const { tag } = req.params;

    const news = await GlobalNewsService.getNewsByCategory(tag, page);

    const news_with_decoded_title = news.map((news_item) => ({
      ...news_item,
      title: base64ToASCII(news_item.title),
      content: base64ToASCII(news_item.content),
      created_on: dayjs(+news_item.created_on).format("dddd - DD MMMM, YYYY"),
    }));
    res.send(news_with_decoded_title);
  } catch (error) {
    next(error);
  }
};

module.exports = { getNews, getNewsByCategory };
