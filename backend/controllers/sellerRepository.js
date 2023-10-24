import { Seller } from "../models/seller.js";
import { connectToDB } from "../utils/db.js";

async function getAllSellers() {
  client = await connectToDB();
  const result = await client.query("SELECT * FROM sellers;");
  return result.rows.map((row) => new Seller(row.id, row.name, row.role));
}

async function addSeller(client, name, role) {
  const res = await client.query(
    "INSERT INTO sellers (name, role) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;",
    [name, role]
  );
  return res;
}

export { addSeller, getAllSellers };
