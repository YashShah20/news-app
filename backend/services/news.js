const { query } = require("../db");

module.exports = {
  async getNewsByCity(city, page = 1) {
    try {
      const limit = 10;
      const offset = (page - 1) * limit;
      const result = await query(
        `SELECT
          local_news.id,
          title,
          content,
          image_url,
          city,
          country,
          first_name as author_first_name,
          last_name as author_last_name,
          created_on,
          tags.name as tag_name
        FROM
          public.local_news
          JOIN news_tags ON local_news.id = news_tags.news_id
          JOIN tags ON news_tags.tag_id = tags.id
          JOIN users ON users.id = local_news.created_by
        WHERE
          city = $1
        ORDER BY
          created_on DESC
        LIMIT
          $2 
        OFFSET 
          $3`,
        [city, limit, offset]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async getNewsById(id) {
    try {
      const result = await query(
        `SELECT id, title, content, image_url, city, country, created_by, created_on
	        FROM public.local_news WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async addNews(title, content, image_url, city, country, created_by) {
    try {
      const result = await query(
        `INSERT INTO public.local_news(
            title, content, image_url, city, country, created_by)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, content, image_url, city, country, created_by]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async updateNewsById(id, title, content, image_url, city, country) {
    try {
      const result = await query(
        `UPDATE public.local_news
            SET title=$2, content=$3, image_url=$4, city=$5, country=$6
            WHERE id=$1 RETURNING *`,
        [id, title, content, image_url, city, country]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async deleteNewsById(id) {
    try {
      const result = await query(
        `DELETE FROM public.local_news WHERE id=$1 RETURNING *`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async getNewsCreatorId(news_id) {
    try {
      const result = await query(
        `select created_by from local_news where id = $1`,
        [news_id]
      );

      if (!result.rows[0]) {
        return null;
      }

      return result.rows[0].created_by;
    } catch (error) {
      throw error;
    }
  },
};
