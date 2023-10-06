const { query } = require("../db");

module.exports = {
  async getNews(page = 1) {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;

      const result = await query(
        `SELECT global_news.id, title, content, global_news.image_url, source_name, source_url, author_name, created_on, categories.label
          FROM public.global_news JOIN public.categories ON categories.id = global_news.category ORDER BY global_news.id LIMIT $1 OFFSET $2;`,
        [limit, offset]
      );

      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  async getNewsByCategory(category, page = 1) {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;

      const result = await query(
        `SELECT global_news.id, title, content, global_news.image_url, source_name, source_url, author_name, created_on, categories.label
          FROM public.global_news JOIN public.categories ON categories.id = global_news.category WHERE category = $1 ORDER BY global_news.id LIMIT $2 OFFSET $3;`,
        [category, limit, offset]
      );

      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  async addNewsByCategory(category, news) {
    try {
      const values_query = news
        .map(
          ({
            hash_id,
            title,
            content,
            image_url,
            source_name,
            source_url,
            author_name,
            created_at,
          }) =>
            `('${hash_id}', 
            '${Buffer.from(title).toString("base64")}', 
            '${Buffer.from(content).toString("base64")}', 
            '${image_url}', '${source_name}', '${source_url}', '${author_name}', 
            '${created_at}', '${category}')`
        )
        .join(", ");

      const result = await query(
        `INSERT INTO public.global_news(
          id, title, content, image_url, source_name, source_url, author_name, created_on, category)
          VALUES ${values_query};`
      );
    } catch (error) {
      throw error;
    }
  },
  async deleteNews(news) {},
};
