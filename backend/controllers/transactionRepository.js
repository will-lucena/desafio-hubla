import { TRANSACTIONS_TYPE, Transaction } from "../models/transaction.js";

import { getClient, query } from "../utils/db.js";
import { addSeller } from "./sellerRepository.js";

const getAllTransactions = async () => {
  const result = await query("SELECT * FROM transactions;");
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
};

const addTransaction = async (client, transaction) => {
  const { kind, date, seller, value, product } = transaction;
  if (!kind || !date || !seller || !value || !product) {
    return;
  }

  await addSeller(transaction);

  const operationMap = {
    [TRANSACTIONS_TYPE.ProducerSale]: 1,
    [TRANSACTIONS_TYPE.AffiliateSale]: 1,
    [TRANSACTIONS_TYPE.CommissionPaid]: -1,
    [TRANSACTIONS_TYPE.CommisionReceived]: 1,
  };

  const finalValue = operationMap[kind] * value;

  const result = await client.query(
    "INSERT INTO transactions (kind, date, seller_name, transaction_value, product_description) VALUES ($1, $2, $3, $4, $5);",
    [kind, date, seller, finalValue, product]
  );

  return result;
};

const addBatch = async (transactions) => {
  let client;
  try {
    client = await getClient();
    await client.query("BEGIN");
    for (const transaction of transactions) {
      await addTransaction(client, transaction);
    }
    await client.query("COMMIT");
  } catch (err) {
    client.query("ROLLBACK");
  } finally {
    client.release();
  }
};

export { addBatch, getAllTransactions };
