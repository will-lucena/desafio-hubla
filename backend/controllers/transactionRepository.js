import { Transaction } from "../models/transaction";

import { connectToDB, pool } from "../queries";

export class TransactionsRepository {
  constructor() {
    connectToDB(pool);
  }

  async getAllTransactions() {
    const result = await pool.query("SELECT * FROM transactions");

    return result.rows.map(
      (row) =>
        new Transaction(
          row.id,
          row.kind,
          row.date,
          row.seller_id,
          row.transaction_value
        )
    );
  }

  async addTransaction(transaction) {
    const { kind, date, seller_id, transaction_value } = transaction;
    await pool.query(
      "INSERT INTO transactions (kind, date, seller_id, transaction_value) VALUES ($1, $2, $3, $4)",
      [kind, date, seller_id, transaction_value]
    );
  }
}
