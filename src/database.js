import { Client } from "pg";

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const client = new Client(config);

client.connect();

export async function query(sql, values) {
  try {
    return await client.query(sql, values);
  } catch (error) {
    console.log(error);
  }
}
