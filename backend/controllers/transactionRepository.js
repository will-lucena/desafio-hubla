import { Transaction } from "../models/transaction.js";

import { pool } from "../utils/db.js";
import { addSeller } from "./sellerRepository.js";

let client = undefined;

async function getAllTransactions() {
  if (!client) {
    client = await pool.connect();
  }
  const result = await client.query("SELECT * FROM transactions;");
  if (result) {
    client.release();
    return result?.rows.map(
      (row) =>
        new Transaction(
          row.id,
          row.kind,
          row.date,
          row.seller_name,
          row.transaction_value,
          row.product_description
        )
    );
  }
  client.release();
  return [];
}

async function addTransaction(transaction) {
  if (!client) {
    client = await pool.connect();
  }

  const { kind, date, seller, value, product } = transaction;
  if (!kind || !date || !seller || !value || !product) {
    return;
  }

  await addSeller(transaction);

  const result = await client.query(
    "INSERT INTO transactions (kind, date, seller_name, transaction_value, product_description) VALUES ($1, $2, $3, $4, $5);",
    [kind, date, seller, value, product]
  );

  return result;
}

async function addBatch(transactions) {
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    transactions.forEach(async (transaction) => {
      await addTransaction(transaction);
    });
    await client.query("COMMIT");
  } catch (err) {
    client.query("ROLLBACK");
  } finally {
    client.release();
  }
}

export { addBatch, getAllTransactions };
