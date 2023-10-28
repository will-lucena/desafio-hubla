import { open } from "fs/promises";
import { Transaction } from "../models/transaction.js";

export const parseTransactions = async (filePath) => {
  let file;
  let transactions;
  try {
    file = await open(filePath);

    transactions = [];

    for await (const line of file.readLines()) {
      transactions.push(sanitizeContent(line));
    }
  } catch (error) {
    throw error;
  } finally {
    file?.close();
  }

  return transactions;
};

export const sanitizeContent = (transaction) => {
  const kind = transaction.substring(0, 1);
  const date = transaction.substring(1, 26);
  const product = transaction.substring(26, 56).trimEnd();
  const value = transaction.substring(56, 66).trimEnd();
  const seller = transaction.substring(66, 86).trimEnd();

  let baseErrorMessage = "Fail to parse transaction";
  const errors = [];

  if (!Number(kind)) {
    errors.push("kind");
  }

  if (!new Date(date).getTime()) {
    errors.push("date");
  }

  if (!seller) {
    errors.push("seller name");
  }

  if (!Number(value)) {
    errors.push("value");
  }

  if (errors.length > 0) {
    const errorMessage = `${baseErrorMessage} ${errors.join(", ")}`;
    throw new Error(errorMessage, { cause: transaction });
  }

  return new Transaction(kind, date, seller, value, product, transaction);
};
