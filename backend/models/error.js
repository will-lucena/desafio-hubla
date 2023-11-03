export const ERROR_TYPES = {
  MISSING_TRANSACTION: "MissingTransaction",
  FAIL_TO_QUERY: "FailToQuery",
  FAIL_TO_PARSE: "FailToParse",
}

export class MissingTransactionError extends Error {
  constructor(cause, message = ERROR_TYPES.MISSING_TRANSACTION) {
    super(message)
    this.cause = cause
    this.name = ERROR_TYPES.MISSING_TRANSACTION
  }
}

export class FailToQueryError extends Error {
  constructor(cause, message = ERROR_TYPES.FAIL_TO_QUERY) {
    super(message)
    this.cause = cause
    this.name = ERROR_TYPES.FAIL_TO_QUERY
  }
}

export class FailToParseError extends Error {
  constructor(cause, message = ERROR_TYPES.FAIL_TO_PARSE) {
    super(message)
    this.cause = cause
    this.name = ERROR_TYPES.FAIL_TO_PARSE
  }
}
