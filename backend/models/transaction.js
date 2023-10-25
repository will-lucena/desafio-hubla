export class Transaction {
  kind;
  date;
  sellerName;
  value;
  productDescription;

  constructor(kind, date, sellerName, value, productDescription) {
    this.kind = kind;
    this.date = date;
    this.sellerName = sellerName;
    this.value = value;
    this.productDescription = productDescription;
  }
}

export const TRANSACTIONS_TYPE = {
  ProducerSale: 1,
  AffiliateSale: 2,
  CommissionPaid: 3,
  CommisionReceived: 4,
};
