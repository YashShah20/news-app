const NewsService = require("../services/news");
const NewsTagService = require("../services/news_tag");
const LocationService = require("../services/location");

const getNewsByCity = async (req, res, next) => {
  try {
    const ip = req.ip;
    const { city } = await LocationService.getLocationFromIP();

    const news = await NewsService.getNewsByCity(city);
    res.send(news);
  } catch (error) {
    next(error);
  }
};

const getNewsDetails = async (req, res, next) => {
  try {
    const { news_id } = req.params;

    const news_details = await NewsService.getNewsById(news_id);

    const news_tags = await NewsTagService.getNewsTagsByNewsId(news_id);
    res.send({ ...news_details, news_tags });
  } catch (error) {
    next(error);
  }
};

const addNews = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { title, description, thumbnail_url, tags } = req.body;

    const ip = req.ip;

    const { city, country } = await LocationService.getLocationFromIP();

    const news = await NewsService.addNews(
      title,
      description,
      thumbnail_url,
      city,
      country,
      id
    );

    if (tags) {
      NewsTagService.addNewsTags(news.id, tags);
    }

    res.send(news);
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;
    const { title, description, thumbnail_url, city, country } = req.body;

    const news_creator = await NewsService.getNewsCreatorId(news_id);
    if (user_id != news_creator) {
      res.status(403);
      throw new Error("unauthorized to update news");
    }

    const news = await NewsService.updateNewsById(
      news_id,
      title,
      description,
      thumbnail_url,
      city,
      country
    );

    res.json(news);
  } catch (error) {
    next(error);
  }
};

const deleteNews = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;

    const news_creator = await NewsService.getNewsCreatorId(news_id);

    if (user_id != news_creator) {
      res.status(403);
      throw new Error("unauthorized to delete news");
    }

    const news = await NewsService.deleteNewsById(news_id);

    res.send(news);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNewsByCity,
  getNewsDetails,
  addNews,
  updateNews,
  deleteNews,
};
