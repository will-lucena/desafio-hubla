import express from "express"
import multer from "multer"

import {
  loadTransactions,
  uploadTransactions,
} from "../controllers/transactionController.js"

const router = express.Router()

const upload = multer({
  dest: "uploads/",
})

router
  .route("/transactions")
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
  .get(loadTransactions)
  /**
   * @api {post} /transactions Upload transactions file
   * @apiName uploadTransactions
   * @apiGroup Transactions
   * @apiBody {File} file .txt file with transaction's to be saved
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
              "productDescription": "PRODUTO TESTE",
              "raw": "22022-01-15T22:20:30.000ZPRODUTO TESTE    0099999VENDEDOR TESTE"
            },
            {
              "kind": "1",
              "date": "2022-01-15T22:20:31.000Z",
              "sellerName": "VENDEDOR TESTE 2",
              "value": 9999,
              "productDescription": "PRODUTO TESTE 2",
              "raw": "22022-01-15T22:20:31.000ZPRODUTO TESTE 2    009999VENDEDOR TESTE 2"
            },
  *       ]
  *     }
  *
  * @apiError FailToParseError Couldn't parse a transactions
  * @apiError MissingTransactionError Couldn't find a transaction related to a affiliate sale
  * @apiError DuplicatedTransactionError The file has a transaction already saved
  * @apiError InvalidFile Didn't received a file
  *
  * @apiErrorExample Error-Response:
  *     HTTP/1.1 400 DuplicatedTransaction
  *     {
            "message": "DuplicatedTransaction",
            "cause": "Key (transaction_value, date, kind, seller_name)=(12750, 2022-01-15 19:20:31-03, 1, VENDEDOR TESTE) already exists.",
            "error": "DuplicatedTransaction"
        }
  */
  .post(upload.single("file"), uploadTransactions)

export { router }
