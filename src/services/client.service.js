const ClientModel = require('../models/Client')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

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
    console.log(accountNumberAlreadyExists)
    if (accountNumberAlreadyExists) {
      throw new Error('O número de conta selecionado já existe!')
    }

    const encryptedPassword = bcrypt.hashSync(data.password, 2)
    const client = { ...data, password: encryptedPassword }

    return await ClientModel.create(client)
  },
  async login (data) {
    const client = await ClientModel.findOne({ account_number: data.account_number })

    if (!client) {
      throw new Error('Número da conta inexistente')
    }

    const passwordMatched = await bcrypt.compare(data.password, client.password)

    if (passwordMatched) {
      return { user: client, token: createToken(client) }
    } else {
      throw new Error('Senha incorreta')
    }
  },
  async profile (id) {
    return await ClientModel.findOne({ _id: id })
  }
}
