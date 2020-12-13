const router = require('express').Router()
const clientController = require('./controllers/client.controller')
const transactionController = require('./controllers/transaction.controller')

router.post('/client', clientController.create)

router.post('/login', clientController.login)

router.get('/profile', clientController.profile)

router.get('/transaction', transactionController.statement)

router.post('/transaction/transfer/:number', transactionController.transfer)

router.post('/transaction/deposit', transactionController.deposit)

router.post('/transaction/withdraw', transactionController.withdraw)

module.exports = router
