const fetch = require("node-fetch");

module.exports = {
  async getNewsCategories() {
    try {
      const result = await fetch(
        `https://www.inshorts.com/api/en/search/trending_topics/`
      );
      const { data } = await result.json();
      return data.trending_tags;
    } catch (error) {
      throw error;
    }
  },
  async getNewsByCategory(category, page = 1) {
    try {
      const result = await fetch(
        `https://www.inshorts.com/api/en/search/trending_topics/${category}?page=${page}`
      );
      const { data } = await result.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
};