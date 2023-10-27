import { parseTransactions, sanitizeContent } from "../utils/parser";
import {
  badFilePath,
  correctTransaction,
  wrongDateTransaction,
  wrongKindTransaction,
  wrongSellerNameTransaction,
  wrongValueTransaction,
} from "./parserMock";

describe("Parser.js", () => {
  it(`should create a transaction when receive working string`, () => {
    const transaction = sanitizeContent(correctTransaction.raw);
    expect(transaction).toEqual(correctTransaction.parsed);
  });
  it(`should emit a Fail to parse transaction kind error when 
        receive a string without a number as kind value`, () => {
    expect(() => sanitizeContent(wrongKindTransaction.raw)).toThrow(
      "Fail to parse transaction kind"
    );
  });
  it(`should emit a Fail to parse transaction date error when
        receive a string with incomplete date value`, () => {
    expect(() => sanitizeContent(wrongDateTransaction.raw)).toThrow(
      "Fail to parse transaction date"
    );
  });
  it(`should emit a Fail to parse transaction seller name error when
        receive a string missing the seller name value`, () => {
    expect(() => sanitizeContent(wrongSellerNameTransaction.raw)).toThrow(
      "Fail to parse transaction seller name"
    );
  });
  it(`should emit a Fail to parse transaction value error when 
      receive a string without only numbers as transaction value`, () => {
    expect(() => sanitizeContent(wrongValueTransaction.raw)).toThrow(
      "Fail to parse transaction value"
    );
  });
  it(`should throw error when file path is wrong`, async () => {
    expect.assertions(1);
    try {
      await parseTransactions(badFilePath);
    } catch (e) {
      const expectedErrorMessage = `ENOENT: no such file or directory, open '${badFilePath}'`;
      expect(e.message).toMatch(expectedErrorMessage);
    }
  });
});
