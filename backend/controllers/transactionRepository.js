import { Transaction } from "../models/transaction.js";

import { connectToDB } from "../utils/db.js";
import { addSeller } from "./sellerRepository.js";

let client;

async function getAllTransactions() {
  client = await connectToDB();
  const result = await client.query("SELECT * FROM transactions;");
  if (result) {
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
  return [];
}

async function addTransaction(transaction, clientOpen) {
  if (clientOpen) {
    client = clientOpen;
  } else {
    client = await connectToDB();
  }

  const { kind, date, seller, value, product } = transaction;
  if (!kind || !date || !seller || !value || !product) {
    return;
  }

  await addSeller(client, seller, kind == 1 ? 0 : 1);
  const result = await client.query(
    "INSERT INTO transactions (kind, date, seller_name, transaction_value, product_description) VALUES ($1, $2, $3, $4, $5);",
    [kind, date, seller, value, product]
  );

  if (!clientOpen) {
    client.release();
  }

  return result;
}

async function addBatch(transactions) {
  client = await connectToDB();
  transactions.forEach(async (transaction) => {
    addTransaction(transaction, client);
  });
}

export { addBatch, addTransaction, getAllTransactions };
