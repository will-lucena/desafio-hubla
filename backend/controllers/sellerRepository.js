import { Seller } from "../models/seller.js";
import { TRANSACTIONS_TYPE } from "../models/transaction.js";
import { pool } from "../utils/db.js";

const SELLERS_KIND = {
  Producer: "1",
  Affiliate: "2",
};

let client = undefined;

async function getAllSellers() {
  if (!client) {
    client = await pool.connect();
  }
  const result = await client.query("SELECT * FROM sellers;");
  client.release();
  return result.rows.map((row) => new Seller(row.id, row.name, row.role));
}

async function addSeller(transaction) {
  const { seller } = transaction;

  if (!client) {
    client = await pool.connect();
  }
  const res = await client.query(
    "INSERT INTO sellers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
    [seller]
  );

  client.release();
  return res;
}

async function createProducerAffiliateRelation() {
  if (!client) {
    client = await pool.connect();
  }

  const commisionReceivedTransactions =
    await getCommissionReceivedTransactions();

  commisionReceivedTransactions.forEach(async (transaction) => {
    const { date, seller_name, transaction_value, product_description } =
      transaction;

    const queryResult = await client.query(
      "SELECT * FROM transactions WHERE kind = '3' AND transaction_value = $1 AND date = $2 AND product_description = $3",
      [transaction_value, date, product_description]
    );

    const [commissionPaidTransaction] = queryResult?.rows;

    await client.query(
      "INSERT INTO affiliates (name, producers_name) VALUES ($1, $2) ON CONFLICT (producers_name) DO NOTHING;",
      [seller_name, commissionPaidTransaction.seller_name]
    );
  });

  client.release();

  return;
}

async function getCommissionReceivedTransactions() {
  if (!client) {
    client = await pool.connect();
  }

  const result = await client.query(
    "SELECT * FROM transactions WHERE kind = $1",
    [TRANSACTIONS_TYPE.CommisionReceived]
  );

  return result?.rows;
}

export { addSeller, createProducerAffiliateRelation, getAllSellers };
