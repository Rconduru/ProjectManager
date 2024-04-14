import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool();
console.log("Pool criado");

export default pool;
