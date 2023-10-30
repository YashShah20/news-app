const { query } = require("../db");

module.exports = {
  async getComments(news_id, parent_id = null) {
    try {
      const parent_id_condition = parent_id
        ? "parent_id = $2"
        : "parent_id is null";

      const params = parent_id ? [news_id, parent_id] : [news_id];

      const result = await query(
        `SELECT c.id, text, created_on, news_id, user_id, parent_id, first_name, last_name, (select count(*) from comments where parent_id = c.id) as reply_comments
            FROM public.comments c JOIN users on users.id = c.user_id WHERE news_id = $1 AND ${parent_id_condition} ORDER BY c.created_on DESC `,
        params
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  async addComment(news_id, user_id, text, parent_id = null) {
    try {
      const result = await query(
        `INSERT INTO public.comments(
            text, news_id, user_id, parent_id)
            VALUES ($1, $2, $3, $4) RETURNING *;`,
        [text, news_id, user_id, parent_id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};
