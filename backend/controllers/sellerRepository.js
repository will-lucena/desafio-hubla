import { Seller } from "../models/seller.js";
import { TRANSACTIONS_TYPE } from "../models/transaction.js";
import { query } from "../utils/db.js";

const SELLERS_KIND = {
  Producer: "PRODUCER",
  Affiliate: "AFFILIATE",
};

const getAllSellers = async () => {
  const result = await query("SELECT * FROM sellers;");
  return result.rows.map((row) => new Seller(row.id, row.name, row.role));
};

const addSeller = async (transaction) => {
  try {
    const { sellerName, kind } = transaction;

    const roleMap = {
      1: SELLERS_KIND.Producer,
      2: SELLERS_KIND.Affiliate,
      3: SELLERS_KIND.Producer,
      4: SELLERS_KIND.Affiliate,
    };

    const role = roleMap[kind];

    const res = await query(
      "INSERT INTO sellers (name, role) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING;",
      [sellerName, role]
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
        "SELECT * FROM transactions WHERE kind = $1 AND transaction_value = $2 AND date = $3 AND product_description = $4",
        [
          TRANSACTIONS_TYPE.CommissionPaid,
          transaction_value * -1,
          date,
          product_description,
        ]
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

const getSellersBallances = async () => {
  const producersBallances = await getProducersBallances();
  const affiliatesBalances = await getAffiliatesBalances();
  const affiliatesSalesByProducer = await getAffiliatesSales();

  const producersFinalBalances = producersBallances.map((balance, index) => {
    return {
      name: balance.name,
      balance:
        Number(balance.balance) +
        Number(affiliatesSalesByProducer[index].balance),
    };
  });

  return [...producersFinalBalances, ...affiliatesBalances];
};

const getProducersBallances = async () => {
  const getProducersQueryResult = await query(
    "SELECT sellers.name FROM sellers WHERE role = $1",
    [SELLERS_KIND.Producer]
  );

  const balances = [];
  for (const producer of getProducersQueryResult.rows) {
    const queryResult = await query(
      "SELECT SUM(transaction_value) FROM transactions WHERE (transactions.seller_name = $1 AND transactions.kind = $2) OR (transactions.seller_name = $1 AND transactions.kind = $3)",
      [
        producer.name,
        TRANSACTIONS_TYPE.ProducerSale,
        TRANSACTIONS_TYPE.CommissionPaid,
      ]
    );
    balances.push({
      ...producer,
      balance: queryResult.rows[0]?.sum / 100 || 0,
    });
  }

  return balances;
};

const getAffiliatesSales = async () => {
  const getProducersQueryResult = await query(
    "SELECT sellers.name FROM sellers WHERE role = $1",
    [SELLERS_KIND.Producer]
  );

  const balances = [];
  for (const producer of getProducersQueryResult.rows) {
    const queryResult = await query(
      "SELECT SUM(transactions.transaction_value) FROM transactions JOIN affiliates ON transactions.seller_name = affiliates.name WHERE transactions.kind = $2 AND affiliates.producers_name = $1",
      [producer.name, TRANSACTIONS_TYPE.AffiliateSale]
    );

    balances.push({
      ...producer,
      balance: queryResult.rows[0]?.sum / 100 || 0,
    });
  }

  return balances;
};

const getAffiliatesBalances = async () => {
  const getAffiliatesQueryResult = await query(
    "SELECT sellers.name FROM sellers WHERE role = $1",
    [SELLERS_KIND.Affiliate]
  );

  const ballances = [];
  for (const producer of getAffiliatesQueryResult.rows) {
    const queryResult = await query(
      "SELECT SUM(transaction_value) FROM transactions WHERE seller_name = $1 AND kind = $2",
      [producer.name, TRANSACTIONS_TYPE.CommisionReceived]
    );
    ballances.push({
      ...producer,
      balance: queryResult.rows[0]?.sum / 100 || 0,
    });
  }

  return ballances;
};

export {
  addSeller,
  createProducerAffiliateRelation,
  getAllSellers,
  getSellersBallances,
};
