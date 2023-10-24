export const getAllTransactions = (newTransactions = []) => {
  return [
    {
      id: 1,
      kind: "1",
      date: "2022-01-15T22:20:30.000Z",
      seller_name: "JOSE CARLOS",
      transaction_value: 12750,
      product_description: "CURSO DE BEM-ESTAR",
    },
    {
      id: 2,
      kind: "1",
      date: "2021-12-03T14:46:02.000Z",
      seller_name: "MARIA CANDIDA",
      transaction_value: 50000,
      product_description: "DOMINANDO INVESTIMENTOS",
    },
    {
      id: 3,
      kind: "2",
      date: "2022-01-16T17:13:54.000Z",
      seller_name: "THIAGO OLIVEIRA",
      transaction_value: 12750,
      product_description: "CURSO DE BEM-ESTAR",
    },
    {
      id: 4,
      kind: "4",
      date: "2022-01-16T17:13:54.000Z",
      seller_name: "THIAGO OLIVEIRA",
      transaction_value: 4500,
      product_description: "CURSO DE BEM-ESTAR",
    },
    {
      id: 5,
      kind: "3",
      date: "2022-01-16T17:13:54.000Z",
      seller_name: "JOSE CARLOS",
      transaction_value: 4500,
      product_description: "CURSO DE BEM-ESTAR",
    },
    ...newTransactions,
  ];
};

export const addTransaction = () => {};
export const addBatch = () => {};

export const mockTransaction = {
  kind: Math.ceil(Math.random() * 5),
  date: Date.now().toLocaleString(),
  seller_name: "Vendedor teste",
  transaction_value: Math.ceil(Math.random() * 100000),
  product_description: "Produto teste",
};
