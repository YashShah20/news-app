const { query } = require("../db");

const addNewsTags = async (news_id, tags) => {
  try {
    const values_query = tags.map((_, index) => `($1,$${index + 2})`).join(",");

    const result = await query(
      `INSERT INTO news_tags (news_id,tag_id) values ${values_query} RETURNING *`,
      [news_id, ...tags]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getNewsTagsByNewsId = async (news_id) => {
  try {
    const result = await query(
      `SELECT tags.id,tags.name from tags JOIN news_tags on tags.id = news_tags.tag_id where news_id = $1`,
      [news_id]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

const deleteNewsTagsByNewsId = async (news_id, tags) => {
  try {
    const tag_ids_query = tags
      .map((_, index) => `tag_id = $${index + 2}`)
      .join(" or ");

    const result = await query(
      `DELETE FROM news_tags where news_id = $1 and (1=2 or ${tag_ids_query}) RETURNING *`,
      [news_id, ...tags]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { getNewsTagsByNewsId, addNewsTags, deleteNewsTagsByNewsId };
