"use strict";

import dotenv from "dotenv";
import express from "express";
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors";

import { SellersRepository } from "./controllers/sellerRepository.js";

import { createUser, getUsers } from "./queries.js";
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
app.get("/", getUsers);
app.post("/", createUser);

let sellersRepository;

app.get("/sellers", async (req, res) => {
  const result = await sellersRepository.getAllSellers();
  res.json(result);
});

app.post("/sellers", async (req, res) => {
  const { name, role } = req.body;

  const result = await sellersRepository.addSeller(name, role);
  res.json(result);
});

app.listen(3000, async (req, res) => {
  console.log(`Running on http://localhost:3000`);
  sellersRepository = new SellersRepository();
});
