const ClientModel = require('../../models').Client
const TransactionModel = require('../../models').Transaction
const AppError = require('../errors/app.error')

module.exports = {
  async deposit (id, value) {
    const { name, balance } = await ClientModel.findByPk(id)

    const newBalance = Number(balance) + Number(value)

    const transaction = {
      type: 'deposit',
      value: value,
      oldBalance: balance,
      newBalance,
      clientId: id
    }

    await ClientModel.update(
      { balance: newBalance },
      { where: { id } }
    )

    await TransactionModel.create(transaction)

    const response = {
      oldBalance: balance,
      newBalance,
      name
    }

    return response
  },
  async withdraw (id, value) {
    const { name, balance } = await ClientModel.findByPk(id)

    if (balance < value) {
      throw new AppError('Valor na conta é menor do que o valor desejado para sacar.', 400)
    }

    const newBalance = Number(balance) - Number(value)

    const transaction = {
      type: 'withdraw',
      value: value,
      oldBalance: balance,
      newBalance,
      clientId: id
    }

    await ClientModel.update(
      { balance: newBalance },
      { where: { id } }
    )

    await TransactionModel.create(transaction)

    const response = {
      oldBalance: balance,
      newBalance,
      name
    }

    return response
  },
  async statement (id) {
    return await TransactionModel.findAll({
      where: {
        clientId: id
      }
    })
  },
  async transfer (id, accountNumber, value) {
    const destinyAccount = await ClientModel.findOne({
      where: {
        account_number: accountNumber
      }
    })

    if (!destinyAccount) {
      throw new AppError('O número da conta informado não existe.', 400)
    }

    const fromAccount = await ClientModel.findByPk(id)

    if (fromAccount.balance < value) {
      throw new AppError('Valor na conta é menor do que o valor desejado para transferir.', 400)
    }

    const newBalance = Number(fromAccount.balance) - Number(value)

    const Transaction = {
      type: 'outcome transfer',
      value: value,
      oldBalance: fromAccount.balance,
      newBalance,
      to: `${destinyAccount.name} - ${destinyAccount.account_number}`,
      clientId: id
    }

    await ClientModel.update(
      { balance: newBalance },
      { where: { id } }
    )
    await TransactionModel.create(Transaction)

    const DestinyAccountNewBalance = Number(destinyAccount.balance) + Number(value)

    const DestinyAccountTransaction = {
      type: 'income transfer',
      value: value,
      oldBalance: destinyAccount.balance,
      newBalance: DestinyAccountNewBalance,
      from: `${fromAccount.name} - ${fromAccount.account_number}`,
      clientId: destinyAccount.id
    }
    await ClientModel.update(
      { balance: DestinyAccountNewBalance },
      { where: { id: destinyAccount.id } }
    )
    await TransactionModel.create(DestinyAccountTransaction)

    const response = {
      oldBalance: fromAccount.balance,
      newBalance,
      name: fromAccount.name,
      to: `${destinyAccount.name} - ${destinyAccount.account_number}`
    }

    return response
  }
}
