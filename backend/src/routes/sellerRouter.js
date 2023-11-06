import express from "express"
import { loadSellersBalances } from "../controllers/sellerController.js"

const router = express.Router()

router
  .route("/sellers/balances")
  /**
   * @api {get} /sellers/balances Request balances of all sellers
   * @apiName loadSellersBalances
   * @apiGroup Sellers
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       [
   *        {
   *            "name": "VENDEDOR TESTE",
   *            "balance": 15
   *        },
   *       ]
   *     }
   *
   * @apiError FailToLoadBalances Couldn't load balances
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Internal Server Error
   *     {
   *       "message": "Fail to load balances"
   *     }
   */
  .get(loadSellersBalances)

export { router }
