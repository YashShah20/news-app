const { Pool } = require("pg");

const DB_URI = process.env.DEV_DATABASE_URL;

const pool = new Pool({
  connectionString: DB_URI,
  ssl: true,
  keepAlive: true,
});

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    return client.query(text, params);
  } catch (error) {
    console.log(error.message);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  pool,
};
