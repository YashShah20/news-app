const { query } = require("../db");

module.exports = {
  async getTags() {
    try {
      const result = await query(`SELECT id, name FROM public.tags;`);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },
  async addTag(name) {
    try {
      const result = await query(
        `INSERT INTO public.tags (name) VALUES ($1) RETURNING *;`,
        [name]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  async updateTagById(id, name) {
    try {
      const result = await query(
        `UPDATE public.tags SET name=$2 WHERE id=$1 RETURNING *;`,
        [id, name]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  async deleteTagById(id) {
    try {
      const result = await query(
        `DELETE FROM public.tags WHERE id = $1 RETURNING *;`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};
