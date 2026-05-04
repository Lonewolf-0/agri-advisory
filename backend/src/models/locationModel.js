import pool from "../config/db.js";

export async function saveLocation(
  userId,
  latitude,
  longitude,
  district,
  state,
) {
  const result = await pool.query(
    `INSERT INTO locations (user_id, latitude, longitude, district, state)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [userId, latitude, longitude, district, state],
  );

  return result.rows[0];
}
