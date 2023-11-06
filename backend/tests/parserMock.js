import { Transaction } from "../src/models/transaction"

export const correctTransaction = {
  raw: "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
  parsed: new Transaction(
    "1",
    "2022-01-15T19:20:30-03:00",
    "JOSE CARLOS",
    "0000012750",
    "CURSO DE BEM-ESTAR",
    "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS"
  ),
}

export const wrongKindTransaction = {
  raw: "A2022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
  parsed: new Transaction(
    "A",
    "2022-01-15T19:20:30-03:00",
    "JOSE CARLOS",
    "0000012750",
    "CURSO DE BEM-ESTAR"
  ),
}

export const wrongDateTransaction = {
  raw: "12022-01-15T19:20:30      CURSO DE BEM-ESTAR            0000012750JOSE CARLOS",
  parsed: new Transaction(
    "1",
    "2022-01-15T19:20:30-03:00",
    "JOSE CARLOS",
    "0000012750",
    "CURSO DE BEM-ESTAR"
  ),
}

export const wrongSellerNameTransaction = {
  raw: "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750",
  parsed: new Transaction(
    "1",
    "2022-01-15T19:20:30-03:00",
    "JOSE CARLOS",
    "0000012750",
    "CURSO DE BEM-ESTAR"
  ),
}

export const wrongValueTransaction = {
  raw: "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR   0000012750JOSE CARLOS",
  parsed: new Transaction(
    "1",
    "2022-01-15T19:20:30-03:00",
    "JOSE CARLOS",
    "0000012750",
    "CURSO DE BEM-ESTAR"
  ),
}

export const badFilePath = "akjsdha"
