import PgPool from "pg";

const { Pool } = PgPool;

let pool;

try {
  const settings = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
  };

  pool = new Pool(settings);
} catch (error) {
  throw error("Fail to create a connection pool");
}

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const query = async (text, params) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    // console.log("executed query", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    throw new Error("Fail to query", { cause: text });
  }
};

export const getClient = () => {
  return pool.connect();
};
