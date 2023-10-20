export class Transaction {
  id;
  kind;
  date;
  seller_id;
  transaction_value;

  constructor(id, kind, date, seller_id, transaction_value) {
    this.id = id;
    this.kind = kind;
    this.date = date;
    this.seller_id = seller_id;
    this.transaction_value = transaction_value;
  }
}
