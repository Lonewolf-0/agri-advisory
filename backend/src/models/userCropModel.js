import pool from "../config/db.js";

export async function selectCrop(userId, cropId) {
  const result = await pool.query(
    `INSERT INTO user_crops (user_id, crop_id)
     VALUES ($1,$2) RETURNING *`,
    [userId, cropId],
  );

  return result.rows[0];
}
