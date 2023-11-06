import { getSellersBallances } from "../repositories/sellerRepository.js"

export const loadSellersBalances = async (req, res) => {
  try {
    const balances = await getSellersBallances()
    res.status(200).json(balances)
  } catch (error) {
    res.status(500).json({
      message: "Fail to load balances",
      error: error.name,
    })
  }
}
