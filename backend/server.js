"use strict"

import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"

import { router as sellerRouter } from "./src/routes/sellerRouter.js"
import { router as transactionRouter } from "./src/routes/transactionRouter.js"

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
}

const app = express()

app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(cors(corsOptions))
  .use(transactionRouter)
  .use(sellerRouter)

app.listen(3000)
