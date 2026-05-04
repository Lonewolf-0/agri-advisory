import pool from "../config/db.js";

export async function getAllCrops() {
  const result = await pool.query("SELECT * FROM crops");
  return result.rows;
}
