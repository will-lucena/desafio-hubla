CREATE TABLE sellers(
  id SERIAL,
  name VARCHAR(20) PRIMARY KEY,
  role VARCHAR(9)
);

CREATE TABLE affiliates(
  id SERIAL,
  name VARCHAR(20) PRIMARY KEY,
  producers_name VARCHAR(20),
  FOREIGN KEY (producers_name) REFERENCES sellers(name)
);

CREATE TABLE transactions(
  id SERIAL PRIMARY KEY,
  kind CHAR(1),
  date TIMESTAMP WITH TIME ZONE,
  seller_name VARCHAR(20),
  product_description VARCHAR(30),
  FOREIGN KEY (seller_name) REFERENCES sellers(name),
  transaction_value INT,
  CONSTRAINT transaction_identifier UNIQUE (transaction_value, date, kind, seller_name)
);