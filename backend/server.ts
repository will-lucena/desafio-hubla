"use strict";

const express = require("express");

const cors = require('cors');
const corsOptions = {
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// Constants
const PORT = 3000;

// App
const app = express();

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.json({message: "Hello my friend"});
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
