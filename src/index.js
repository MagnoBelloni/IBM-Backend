const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const mongoConnector = require('./mongoose-conector')
const HandleHttpError = require('./middlewares/handle-http-error')
const AuthMiddleware = require('./middlewares/auth-middleware')

require('dotenv').config()

const app = express()

const { MONGO_URI, HTTP_PORT } = process.env
mongoConnector(MONGO_URI)
app.use(cors())
app.use(express.json())
app.use(HandleHttpError)
app.use(AuthMiddleware)

app.use(routes)

const port = HTTP_PORT || 3333

app.listen(port, () => {
  console.log(`App running on port: ${port}`)
})
