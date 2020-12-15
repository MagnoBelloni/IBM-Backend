const ClientModel = require('../models/Client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')
const AppError = require('../errors/app.error')

const createToken = (payload) => {
  const { JWT_SECRET } = process.env

  return jwt.sign({
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix(),
    id: payload._id
  }, JWT_SECRET)
}

module.exports = {
  async create (data) {
    const accountNumberAlreadyExists = await ClientModel.findOne({ account_number: data.account_number })

    if (accountNumberAlreadyExists) {
      throw new AppError('O número de conta selecionado já existe!', 400)
    }

    const encryptedPassword = bcrypt.hashSync(data.password, 2)
    const client = { ...data, password: encryptedPassword }

    return await ClientModel.create(client)
  },
  async login (data) {
    const client = await ClientModel.findOne({ account_number: data.account_number })

    if (!client) {
      throw new AppError('Número da conta inexistente', 400)
    }

    const passwordMatched = await bcrypt.compare(data.password, client.password)

    if (passwordMatched) {
      return { user: client, token: createToken(client) }
    } else {
      throw new AppError('Senha incorreta', 401)
    }
  },
  async profile (id) {
    return await ClientModel.findOne({ _id: id })
  }
}
