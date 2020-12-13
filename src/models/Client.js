const mongoose = require('mongoose')

const { Schema } = mongoose

const Client = new Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  account_number: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  transactions: [this]
})

module.exports = mongoose.model('client', Client)
