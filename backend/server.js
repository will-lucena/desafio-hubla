"use strict";

import "dotenv/config";
import express from "express";

import bodyParser from "body-parser";
import cors from "cors";

import {
  addSeller,
  createProducerAffiliateRelation,
  getAllSellers,
} from "./controllers/sellerRepository.js";
import { getAllTransactions } from "./controllers/transactionRepository.js";
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

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

app.post("/transactions", async (req, res) => {
  const { payload } = req.body;
  await addBatch(payload);
  await createProducerAffiliateRelation(payload);
  res.json().status(200);
});

app.get("/transactions", async (req, res) => {
  const result = await getAllTransactions();
  res.json(result);
});

app.listen(3000, async (req, res) => {});
