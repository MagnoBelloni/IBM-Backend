const TransactionService = require('../services/transaction.service')

module.exports = {
  async deposit (req, res) {
    try {
      const { id } = req.decoded
      const { value } = req.body
      const response = await TransactionService.deposit(id, value)

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  },
  async withdraw (req, res) {
    try {
      const { id } = req.decoded
      const { value } = req.body
      const response = await TransactionService.withdraw(id, value)

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  },
  async statement (req, res) {
    try {
      const { id } = req.decoded

      const response = await TransactionService.statement(id)

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  },
  async transfer (req, res) {
    try {
      const { id } = req.decoded
      const { number } = req.params
      const { value } = req.body

      const response = await TransactionService.transfer(id, number, value)

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  }
}
