CREATE TABLE sellers (
  id SERIAL,
  name VARCHAR(20) PRIMARY KEY,
  role CHAR(1)
);

CREATE TABLE transactions(
  id SERIAL PRIMARY KEY,
  kind CHAR(1),
  date TIMESTAMP WITH TIME ZONE,
  seller_name VARCHAR(20),
  product_description VARCHAR(30),
  FOREIGN KEY (seller_name) REFERENCES sellers(name),
  transaction_value INT
);