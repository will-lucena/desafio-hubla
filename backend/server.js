"use strict"

import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import multer from "multer"

import {
  createProducerAffiliateRelation,
  getSellersBallances,
} from "./controllers/sellerRepository.js"
import {
  addBatch,
  getAllTransactions,
} from "./controllers/transactionRepository.js"
import { parseTransactions } from "./utils/parser.js"
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
}

const upload = multer({
  dest: "uploads/",
})
const app = express()

app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(cors(corsOptions))

app.post("/transactions", upload.single("file"), async (req, res) => {
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
    })
  }
})

app.get("/balances", async (req, res) => {
  try {
    const balances = await getSellersBallances()
    res.status(200).json(balances)
  } catch (error) {
    res.status(500).json({
      message: "Fail to load balances",
    })
  }
})

/**
 * @api {get} /transactions Request transasctions
 * @apiName getTransactions
 * @apiGroup Transactions
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       [
 *        {
            "kind": "1",
            "date": "2022-01-15T22:20:30.000Z",
            "sellerName": "VENDEDOR TESTE",
            "value": 99999,
            "productDescription": "PRODUTO TESTE"
          },
 *       ]
 *     }
 *
 * @apiError FailToLoadTransactions Couldn't load transactions
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Fail to load transactions"
 *     }
 */

app.get("/transactions", async (req, res) => {
  try {
    const result = await getAllTransactions()
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({
      message: "Fail to load transactions",
    })
  }
})

const saveTransactions = async (filePath) => {
  const transactions = await parseTransactions(filePath)
  await addBatch(transactions)
  await createProducerAffiliateRelation()
  return transactions
}

app.listen(3000)
