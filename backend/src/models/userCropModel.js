import pool from "../config/db.js";

export async function selectCrop(userId, cropId) {
  const result = await pool.query(
    `INSERT INTO user_crops (user_id, crop_id)
     VALUES ($1,$2) RETURNING *`,
    [userId, cropId],
  );

  return result.rows[0];
}

export async function getUserCrop(userId) {
  const result = await pool.query(
    `SELECT crops.id, crops.name
     FROM user_crops
     JOIN crops ON crops.id = user_crops.crop_id
     WHERE user_crops.user_id = $1
     ORDER BY user_crops.created_at DESC
     LIMIT 1`,
    [userId],
  );

  return result.rows[0];
}
