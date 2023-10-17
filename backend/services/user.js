const { pool } = require("../db");

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query("select * from users where email = $1", [
      email,
    ]);

    const user = result.rows[0];

    return user;
  } catch (error) {
    throw error;
  }
};

const addUser = async (first_name, last_name, username, email, password) => {
  try {
    const result = await pool.query(
      `INSERT INTO public.users(
        first_name, last_name, username, email, password)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [first_name, last_name, username, email, password]
    );

    const user = result.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
};

const updatePasswordById = async (id, password) => {
  try {
    const result = await pool.query(
      `UPDATE users SET password = $2 WHERE id = $1`,
      [id, password]
    );

    const user = result.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getUserByEmail,
  addUser,
  updatePasswordById,
};
