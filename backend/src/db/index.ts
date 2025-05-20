import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();
const {
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
} = process.env;

const pool = new Pool({
  host: PGHOST,
  port: Number(PGPORT),
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
});
console.log("Pool criado");

export default pool;
