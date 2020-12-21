const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const HandleHttpError = require('./middlewares/handle-http-error')
const AuthMiddleware = require('./middlewares/auth-middleware')

require('dotenv').config()

const app = express()

const { HTTP_PORT } = process.env
app.use(cors())
app.use(express.json())
app.use(HandleHttpError)
app.use(AuthMiddleware)

app.use(routes)

const port = HTTP_PORT || 3333

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})
