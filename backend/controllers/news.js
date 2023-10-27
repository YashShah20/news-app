const NewsService = require("../services/news");
const NewsTagService = require("../services/news_tag");
const LocationService = require("../services/location");
const dayjs = require("dayjs");

const getNewsByCity = async (req, res, next) => {
  try {
    // const ip = req.ip;
    // const { city } = await LocationService.getLocationFromIP();
    const { city } = req.user;
    const { page } = req.query;

    const news = await NewsService.getNewsByCity(city, page);

    const news_with_tags = news.reduce((acc, news_item) => {
      const index = acc.findIndex((item) => item.id === news_item.id);
      if (index === -1) {
        const author_name = `${news_item.author_first_name} ${news_item.author_last_name}`;
        const created_on = dayjs(+news_item.created_on).format(
          "dddd - DD MMMM, YYYY"
        );
        acc.push({
          ...news_item,
          author_name,
          created_on,
          tags: [news_item.tag_name],
        });
      } else {
        acc[index].tags.push(news_item.tag_name);
      }
      return acc;
    }, []);
    res.send(news_with_tags);
  } catch (error) {
    next(error);
  }
};

const getNewsDetails = async (req, res, next) => {
  try {
    const { news_id } = req.params;
    const { city } = req.user;

    const news_details = await NewsService.getNewsById(news_id, city);

    const news_with_tags = news_details.reduce((acc, news_item) => {
      const index = acc.findIndex((item) => item.id === news_item.id);
      if (index === -1) {
        const author_name = `${news_item.author_first_name} ${news_item.author_last_name}`;
        const created_on = dayjs(+news_item.created_on).format(
          "dddd - DD MMMM, YYYY"
        );
        acc.push({
          ...news_item,
          author_name,
          created_on,
          tags: [news_item.tag_name],
        });
      } else {
        acc[index].tags.push(news_item.tag_name);
      }
      return acc;
    }, []);
    res.send(news_with_tags[0]);
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
