export const ERROR_TYPES = {
  MISSING_TRANSACTION: "MissingTransaction",
  FAIL_TO_QUERY: "FailToQuery",
  FAIL_TO_PARSE: "FailToParse",
  DUPLICATED_TRANSACTION: "DuplicatedTransaction",
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

export class DuplicatedTransactionError extends Error {
  constructor(cause, message = ERROR_TYPES.DUPLICATED_TRANSACTION) {
    super(message)
    this.cause = cause
    this.name = ERROR_TYPES.DUPLICATED_TRANSACTION
  }
}
