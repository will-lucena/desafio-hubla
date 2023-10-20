import { Seller } from "../models/seller.js";

import { connectToDB, pool } from "../queries.js";

export class SellersRepository {
  constructor() {
    connectToDB(pool);
  }

  async getAllSellers() {
    const result = await pool.query("SELECT * FROM sellers");

    return result.rows.map((row) => new Seller(row.id, row.name, row.role));
  }

  async addSeller(name, role) {
    await pool.query("INSERT INTO sellers (name, role) VALUES ($1, $2)", [
      name,
      role,
    ]);
  }
}
