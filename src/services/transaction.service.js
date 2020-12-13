const ClientModel = require('../models/Client')
const mongoose = require('mongoose')

module.exports = {
  async deposit (id, value) {
    const { name, balance } = await ClientModel.findById(id)

    const newBalance = Number(balance) + Number(value)

    const transaction = {
      type: 'deposit',
      value: value,
      oldBalance: balance,
      newBalance,
      date: new Date()
    }

    await ClientModel.findByIdAndUpdate(id, { balance: newBalance, $push: { transactions: transaction } }, { useFindAndModify: false })

    const response = {
      oldBalance: balance,
      newBalance,
      name
    }

    return response
  },
  async withdraw (id, value) {
    const { name, balance } = await ClientModel.findById(id)

    if (balance < value) {
      throw new Error('Valor na conta é menor do que o valor desejado para sacar.')
    }

    const newBalance = Number(balance) - Number(value)

    const transaction = {
      type: 'withdraw',
      value: value,
      oldBalance: balance,
      newBalance,
      date: new Date()
    }

    await ClientModel.findByIdAndUpdate(id, { balance: newBalance, $push: { transactions: transaction } }, { useFindAndModify: false })

    const response = {
      oldBalance: balance,
      newBalance,
      name
    }

    return response
  },
  async statement (id) {
    return await ClientModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(id) } },
      { $project: { name: 0, age: 0, email: 0, password: 0, __v: 0 } }
    ])
  },
  async transfer (id, accountNumber, value) {
    const destinyAccount = await ClientModel.findOne({ account_number: accountNumber })

    if (!destinyAccount) {
      throw new Error('O número da conta informado não existe.')
    }

    const fromAccount = await ClientModel.findById(id)

    if (fromAccount.balance < value) {
      throw new Error('Valor na conta é menor do que o valor desejado para transferir.')
    }

    const newBalance = Number(fromAccount.balance) - Number(value)

    const Transaction = {
      type: 'outgoing transfer',
      value: value,
      oldBalance: fromAccount.balance,
      newBalance,
      date: new Date(),
      to: accountNumber
    }

    await ClientModel.findByIdAndUpdate(id, { balance: newBalance, $push: { transactions: Transaction } }, { useFindAndModify: false })

    const DestinyAccountNewBalance = Number(destinyAccount.balance) + Number(value)

    const DestinyAccountTransaction = {
      type: 'income transfer',
      value: value,
      oldBalance: destinyAccount.balance,
      newBalance: DestinyAccountNewBalance,
      date: new Date(),
      from: `${fromAccount.name} - ${fromAccount.account_number}`
    }

    await ClientModel.findByIdAndUpdate(destinyAccount._id, { balance: DestinyAccountNewBalance, $push: { transactions: DestinyAccountTransaction } }, { useFindAndModify: false })

    const response = {
      oldBalance: fromAccount.balance,
      newBalance,
      name: fromAccount.name,
      to: `${destinyAccount.name} - ${destinyAccount.account_number}`
    }

    return response
  }
}