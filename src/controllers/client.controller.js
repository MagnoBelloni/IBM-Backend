const ClientService = require('../services/client.service')

module.exports = {
  async create (req, res) {
    try {
      const { body } = req
      const response = await ClientService.create(body)

      delete response.password

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  },
  async login (req, res) {
    try {
      const { body } = req
      const response = await ClientService.login(body)

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  },
  async profile (req, res) {
    try {
      const { id } = req.decoded
      const response = await ClientService.profile(id)

      delete response.password

      res.send(response)
    } catch (error) {
      res.HandleHttpError(error)
    }
  }
}
