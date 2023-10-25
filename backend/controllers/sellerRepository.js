import { Seller } from "../models/seller.js";
import { TRANSACTIONS_TYPE } from "../models/transaction.js";
import { query } from "../utils/db.js";

const SELLERS_KIND = {
  Producer: "1",
  Affiliate: "2",
};

const getAllSellers = async () => {
  const result = await query("SELECT * FROM sellers;");
  return result.rows.map((row) => new Seller(row.id, row.name, row.role));
};

const addSeller = async (transaction) => {
  try {
    const { seller } = transaction;

    const res = await query(
      "INSERT INTO sellers (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
      [seller]
    );
    return res;
  } catch (err) {}
};

const createProducerAffiliateRelation = async () => {
  try {
    const commisionReceivedTransactions = await query(
      "SELECT * FROM transactions WHERE kind = $1",
      [TRANSACTIONS_TYPE.CommisionReceived]
    );

    for (const transaction of commisionReceivedTransactions?.rows) {
      const { date, seller_name, transaction_value, product_description } =
        transaction;

      const queryResult = await query(
        "SELECT * FROM transactions WHERE kind = '3' AND transaction_value = $1 AND date = $2 AND product_description = $3",
        [transaction_value, date, product_description]
      );

      const [commissionPaidTransaction] = queryResult?.rows;

      await query(
        "INSERT INTO affiliates (name, producers_name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;",
        [seller_name, commissionPaidTransaction.seller_name]
      );
    }

    return;
  } catch (err) {}
};

const getSellersWallets = async () => {};

export {
  addSeller,
  createProducerAffiliateRelation,
  getAllSellers,
  getSellersWallets,
};
