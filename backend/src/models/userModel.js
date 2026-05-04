import pool from "../config/db.js";

async function createUser(name, email, password) {
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, password],
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
}

export { createUser, findUserByEmail };
