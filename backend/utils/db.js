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
} catch (err) {
  console.log("deu ruim pra criar a pool parceiro");
}

const connectToDB = async () => {
  try {
    return await pool.connect();
  } catch (err) {
    throw err;
  }
};

export { connectToDB };
