const { query } = require("../db");

module.exports = {
  async getCategories() {
    try {
      const result = await query(`SELECT * from categories;`);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async addCategories(categories) {
    try {
      const category_values = categories
        .map(
          ({ tag, label, image_url }) => `('${tag}','${label}','${image_url}')`
        )
        .join(",");

      const result = await query(
        `INSERT INTO public.categories(
          tag, label, image_url)
          VALUES ${category_values} RETURNING *;`
      );

      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  async addCategory(tag, label, image_url) {
    try {
      const result = await query(
        `INSERT INTO public.categories(
          label, image_url)
          VALUES ($1,$2,$3) RETURNING *;`,
        [tag, label, image_url]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async setCategoryTotalPage(tag, total_page) {
    try {
      const result = await query(
        `UPDATE public.categories
          SET total_page=$2
          WHERE tag=$1 RETURNING *;`,
        [tag, total_page]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  async setCategoryCurrentPage(tag, current_page) {
    try {
      const result = await query(
        `UPDATE public.categories
          SET current_page=$2
          WHERE tag=$1 RETURNING *;`,
        [tag, current_page]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};
