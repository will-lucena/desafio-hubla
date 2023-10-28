import { TRANSACTIONS_TYPE, Transaction } from "../models/transaction.js"

import { getClient, query } from "../utils/db.js"
import { addSeller } from "./sellerRepository.js"

const getAllTransactions = async () => {
  const result = await query("SELECT * FROM transactions;")
  if (result) {
    return result?.rows.map(
      (row) =>
        new Transaction(
          row.kind,
          row.date,
          row.seller_name,
          row.transaction_value,
          row.product_description
        )
    )
  }
  return []
}

const addTransaction = async (client, transaction) => {
  const { kind, date, sellerName, value, productDescription } = transaction

  if (!kind || !date || !sellerName || !value || !productDescription) {
    return
  }

  await addSeller(transaction)

  const operationMap = {
    [TRANSACTIONS_TYPE.ProducerSale]: 1,
    [TRANSACTIONS_TYPE.AffiliateSale]: 1,
    [TRANSACTIONS_TYPE.CommissionPaid]: -1,
    [TRANSACTIONS_TYPE.CommisionReceived]: 1,
  }

  const finalValue = operationMap[kind] * value

  const result = await client.query(
    "INSERT INTO transactions (kind, date, seller_name, transaction_value, product_description) VALUES ($1, $2, $3, $4, $5);",
    [kind, date, sellerName, finalValue, productDescription]
  )

  return result
}

const addBatch = async (transactions) => {
  let client
  try {
    client = await getClient()
    await client.query("BEGIN")
    for (const transaction of transactions) {
      if (isValidTransaction(transaction, transactions)) {
        await addTransaction(client, transaction)
      } else {
        throw new Error("missing transaction on affiliate sale", {
          cause: transaction.raw,
        })
      }
    }
    await client.query("COMMIT")
  } catch (error) {
    const customError = handleError(error)
    client.query("ROLLBACK")
    throw customError
  } finally {
    client.release()
  }
}

const isValidTransaction = (transaction, transactions) => {
  if (transaction.kind == TRANSACTIONS_TYPE.ProducerSale) {
    return true
  }

  const comissionPaidTransaction = transactions.find(
    (target) =>
      transaction.areSiblings(target) &&
      target.kind == TRANSACTIONS_TYPE.CommissionPaid
  )
  const comissionReceivedTransaction = transactions.find(
    (target) =>
      transaction.areSiblings(target) &&
      target.kind == TRANSACTIONS_TYPE.CommisionReceived
  )

  const affiliateSale = transactions.find(
    (target) =>
      transaction.areSiblings(target) &&
      target.kind == TRANSACTIONS_TYPE.AffiliateSale
  )

  return (
    comissionPaidTransaction && comissionReceivedTransaction && affiliateSale
  )
}

const handleError = (error) => {
  if (error.message.includes("duplicate key value")) {
    return new Error("Duplicated transaction", {
      cause: error.detail,
    })
  }

  return error
}

export { addBatch, getAllTransactions }
