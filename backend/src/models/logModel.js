import pool from "../config/db.js";

export async function saveAdvisoryLog(data) {
  const query = `
    INSERT INTO advisory_logs
    (user_id, crop_name, latitude, longitude, advisory, weather)
    VALUES ($1,$2,$3,$4,$5,$6)
  `;

  const values = [
    data.userId,
    data.crop,
    data.latitude,
    data.longitude,
    JSON.stringify(data.advisory),
    JSON.stringify(data.weather),
  ];

  await pool.query(query, values);
}
