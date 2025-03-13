import mariadb from 'mariadb';
import parsedEnv from './config.js';

const pool = mariadb.createPool({
  host: parsedEnv.DB_HOST,
  user: parsedEnv.DB_USER,
  password: parsedEnv.DB_PASSWORD,
  database: parsedEnv.DB_DATABASE,
  connectionLimit: 5
});

export async function connect() {
  const connection = await pool.getConnection();
  return connection;
}

