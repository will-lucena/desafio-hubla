export class Transaction {
  kind
  date
  sellerName
  value
  productDescription
  raw

  constructor(kind, date, sellerName, value, productDescription, raw) {
    this.kind = kind
    this.date = date
    this.sellerName = sellerName
    this.value = value
    this.productDescription = productDescription
    this.raw = raw
  }

  areSiblings(transaction) {
    if (transaction.date !== this.date) {
      return false
    }

    if (transaction.productDescription !== this.productDescription) {
      return false
    }

    return true
  }
}

export const TRANSACTIONS_TYPE = {
  ProducerSale: 1,
  AffiliateSale: 2,
  CommissionPaid: 3,
  CommisionReceived: 4,
}
