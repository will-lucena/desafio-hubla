import { baseInstance, uploadInstance } from '.'

export async function loadTransactions() {
  return await baseInstance.get(`/transactions`)
}

export async function uploadTransactionsFile(file) {
  let formData = new FormData()
  formData.append('file', file)
  return uploadInstance.post(`/transactions`, formData)
}
