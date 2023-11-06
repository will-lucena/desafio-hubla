import { createProducerAffiliateRelation } from "../repositories/sellerRepository.js"
import {
  addBatch,
  getAllTransactions,
} from "../repositories/transactionRepository.js"
import { parseTransactions } from "../utils/parser.js"

export const loadTransactions = async (_, res) => {
  try {
    const result = await getAllTransactions()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: "Fail to load transactions",
      error: error.name,
    })
  }
}

export const uploadTransactions = async (req, res) => {
  try {
    const filePath = req.file.path
    const transactions = await saveTransactions(filePath)
    return res.status(200).json(transactions)
  } catch (error) {
    if (error.message.includes("undefined")) {
      return res.status(400).json({
        message: "Invalid file",
      })
    }

    return res.status(400).json({
      message: error.message,
      cause: error.cause,
      error: error.name,
    })
  }
}

const saveTransactions = async (filePath) => {
  const transactions = await parseTransactions(filePath)
  await addBatch(transactions)
  await createProducerAffiliateRelation()
  return transactions
}
