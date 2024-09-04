// db/database.js
import { createPool } from "mysql2/promise";

export async function getConnectionPool() {
  const pool = await createPool({
    host: "localhost",
    user: "root",
    database: "db_system",
  });
  return pool;
}
