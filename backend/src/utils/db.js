import PgPool from "pg"
import { FailToQueryError } from "../models/error.js"

const { Pool } = PgPool

let pool

try {
  const settings = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
  }

  pool = new Pool(settings)
} catch (error) {
  throw error("Fail to create a connection pool")
}

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

export const query = async (text, params) => {
  try {
    // const start = Date.now()
    const res = await pool.query(text, params)
    // const duration = Date.now() - start
    // console.log("executed query", { text, duration, rows: res.rowCount });
    return res
  } catch (error) {
    throw new FailToQueryError(text)
  }
}

export const getClient = () => {
  return pool.connect()
}
