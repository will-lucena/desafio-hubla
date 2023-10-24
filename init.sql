CREATE TABLE sellers(
  id SERIAL,
  name VARCHAR(20) PRIMARY KEY,
);

CREATE TABLE affiliates(
  id SERIAL,
  name VARCHAR(20),
  producers_name VARCHAR(20) PRIMARY KEY,
  FOREIGN KEY (producers_name) REFERENCES sellers(name)
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