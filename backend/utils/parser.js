import { open } from "fs/promises";
import { Transaction } from "../models/transaction.js";

export const parseTransactions = async (filePath) => {
  if (filePath) {
    const file = await open(filePath);

    const transactions = [];

    try {
      for await (const line of file.readLines()) {
        transactions.push(sanitizeContent(line));
      }
    } catch (error) {
      throw error;
    } finally {
      file.close();
    }

    return transactions;
  }
};

function sanitizeContent(transaction) {
  const kind = transaction.substring(0, 1);
  const date = transaction.substring(1, 26);
  const product = transaction.substring(26, 56).trimEnd();
  const value = transaction.substring(56, 66).trimEnd();
  const seller = transaction.substring(66, 86).trimEnd();

  let baseErrorMessage = "Fail to parse transaction";
  let errorMessage = undefined;

  if (!Number(kind)) {
    errorMessage = `${baseErrorMessage} kind`;
  }

  if (!new Date(date).getTime()) {
    errorMessage = `${baseErrorMessage} date`;
  }

  if (!seller) {
    errorMessage = `${baseErrorMessage} seller name`;
  }

  if (!Number(value)) {
    errorMessage = `${baseErrorMessage} value`;
  }

  if (errorMessage) {
    throw new Error(errorMessage, { cause: transaction });
  }

  return new Transaction(kind, date, seller, value, product);
}
