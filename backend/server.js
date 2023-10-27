"use strict";

import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import multer from "multer";

import {
  addSeller,
  createProducerAffiliateRelation,
  getAllSellers,
  getSellersBallances,
} from "./controllers/sellerRepository.js";
import {
  addBatch,
  getAllTransactions,
} from "./controllers/transactionRepository.js";
import { parseTransactions } from "./utils/parser.js";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

const upload = multer({
  dest: "uploads/",
});
const app = express();

app
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(cors(corsOptions));

app.get("/sellers", async (req, res) => {
  const result = await getAllSellers();
  res.json(result);
});

app.post("/sellers", async (req, res) => {
  const { name, role } = req.body;

  const result = await addSeller(name, role);
  res.json(result);
});

app.post("/transactions", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  try {
    const transactions = await parseTransactions(filePath);
    await addBatch(transactions);
    await createProducerAffiliateRelation();
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      cause: error.cause,
    });
  }
});

app.get("/balances", async (req, res) => {
  const balances = await getSellersBallances();

  res.json(balances);
});

app.get("/transactions", async (req, res) => {
  const result = await getAllTransactions();
  res.json(result);
});

app.listen(3000, async (req, res) => {});
