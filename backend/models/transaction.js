export class Transaction {
  id;
  kind;
  date;
  seller_name;
  transaction_value;
  product_description;

  constructor(
    id,
    kind,
    date,
    seller_name,
    transaction_value,
    product_description
  ) {
    this.id = id;
    this.kind = kind;
    this.date = date;
    this.seller_name = seller_name;
    this.transaction_value = transaction_value;
    this.product_description = product_description;
  }
}

export const TRANSACTIONS_TYPE = {
  ProducerSale: 1,
  AffiliateSale: 2,
  CommissionPaid: 3,
  CommisionReceived: 4,
};
