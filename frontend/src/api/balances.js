import { baseInstance } from '.'

export async function loadBalances() {
  return baseInstance.get(`/balances`)
}
