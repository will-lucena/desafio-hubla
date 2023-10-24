jest.mock("../controllers/transactionRepository", () =>
  require("./transactionRepositoryMock")
);

import {
  addBatch,
  addTransaction,
  getAllTransactions,
} from "../controllers/transactionRepository";
import { mockTransaction } from "./transactionRepositoryMock";

describe("TransactionRepository", () => {
  it("should get all database transactions", async () => {
    const transactions = await getAllTransactions();
    expect(transactions).toHaveLength(5);
  });
  it("should add a transactions", async () => {
    let transactions = await getAllTransactions();
    expect(transactions).toHaveLength(5);

    await addTransaction(mockTransaction);

    transactions = await getAllTransactions([mockTransaction]);
    expect(transactions).toHaveLength(6);
  });
  it("should add a batch of transactions", async () => {
    let transactions = await getAllTransactions();
    expect(transactions).toHaveLength(5);

    await addBatch(transactions);

    transactions = await getAllTransactions(transactions);
    expect(transactions).toHaveLength(10);
  });
});
