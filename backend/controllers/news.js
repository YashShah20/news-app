const NewsService = require("../services/news");
const NewsTagService = require("../services/news_tag");
const LocationService = require("../services/location");

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

        acc.push({
          ...news_item,
          author_name,
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

        acc.push({
          ...news_item,
          author_name,
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

const getNewsInsights = async (req, res, next) => {
  try {
    const news_by_city_and_category =
      await NewsService.getNewsCountByCityAndCategory();

    const news_by_category = news_by_city_and_category.reduce((acc, news) => {
      let category_index = acc.findIndex((item) => item.name === news.category);

      if (category_index === -1) {
        const category_object = {
          name: news.category,
          data: [],
        };

        acc.push(category_object);
        category_index = acc.length - 1;
      }

      if (!!news.city) {
        acc[category_index].data.push({
          x: news.city,
          y: news.count,
        });
      }

      return acc;
    }, []);

    res.send(news_by_category);
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
  getNewsInsights,
};
