// src/db.ts
import dotenv from 'dotenv';
import { Pool, QueryResultRow } from 'pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', err => {
  console.error('Unexpected PG error', err);
  process.exit(-1);
});


export async function query<T extends QueryResultRow>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const result = await pool.query<T>(text, params);
  return result.rows;
}
