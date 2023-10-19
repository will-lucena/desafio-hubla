"use strict";

const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const bodyParser = require("body-parser");

const { getUsers, createUser, connectToDB } = require("./queries.js");
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

app.listen(3000, async (req, res) => {
  console.log(`Running on http://localhost:3000`);
  connectToDB();
});
