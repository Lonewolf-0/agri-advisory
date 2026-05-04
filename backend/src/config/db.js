import {Pool} from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "agri_advisory",
  password: "postgres",
  post: 5432,
});

export default pool;
