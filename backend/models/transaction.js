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
