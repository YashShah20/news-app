const NewsService = require("../services/news");
const NewsTagService = require("../services/news_tag");
const LocationService = require("../services/location");
const dayjs = require("dayjs");

const getNewsByCity = async (req, res, next) => {
  try {
    const ip = req.ip;
    const { city } = await LocationService.getLocationFromIP();

    const news = await NewsService.getNewsByCity(city);

    const news_with_tags = await Promise.all(
      news.map(async (news_item) => {
        const author_name = `${news_item.author_first_name} ${news_item.author_last_name}`;
        const created_on = dayjs(+news_item.created_on).format(
          "dddd - DD MMMM, YYYY"
        );

        const news_tags = await NewsTagService.getNewsTagsByNewsId(
          news_item.id
        );

        const tags = news_tags.map((tag) => tag.name);
        return { ...news_item, created_on, author_name, tags };
      })
    );
    res.send(news_with_tags);
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
    const { title, content, image_url, tags } = req.body;

    const ip = req.ip;

    const { city, country } = await LocationService.getLocationFromIP();

    const news = await NewsService.addNews(
      title,
      content,
      image_url,
      city,
      country,
      id
    );

    if (tags) {
      NewsTagService.addNewsTags(news.id, tags);
    }

    // const author_name = `${news.author_first_name} ${news.author_last_name}`;
    // const created_on = dayjs(+news.created_on).format(
    //   "dddd - DD MMMM, YYYY"
    // );

    // const news_tags = tags.map((tag) => tag.name);

    res.send(news);
  } catch (error) {
    next(error);
  }
};

const updateNews = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    const { news_id } = req.params;
    const { title, content, image_url, city, country } = req.body;

    const news_creator = await NewsService.getNewsCreatorId(news_id);
    if (user_id != news_creator) {
      res.status(403);
      throw new Error("unauthorized to update news");
    }

    const news = await NewsService.updateNewsById(
      news_id,
      title,
      content,
      image_url,
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
