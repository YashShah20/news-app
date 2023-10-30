const { query } = require("../db");

const upvoteNewsById = async (news_id, user_id) => {
  try {
    const result = await query(
      `INSERT INTO public.upvotes(
        news_id, user_id)
        VALUES ($1, $2) RETURNING *;`,
      [news_id, user_id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteUpvoteByNewsId = async (news_id, user_id) => {
  try {
    const result = await query(
      `delete from upvotes where news_id = $1 AND user_id = $2 RETURNING *`,
      [news_id, user_id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getUserUpvoteByNewsId = async (news_id, user_id) => {
  try {
    const result = await query(
      `select * from upvotes where news_id = $1 AND user_id = $2`,
      [news_id, user_id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  upvoteNewsById,
  getUserUpvoteByNewsId,
  deleteUpvoteByNewsId,
};
