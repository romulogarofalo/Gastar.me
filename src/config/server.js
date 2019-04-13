const port = 3003

const bodyParser = require('body-parser')

const express = require('express')

const server = express()

const router = require('./routes')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use('/api', router)

server.listen(port, () => {
  // console.log(`server is running at port: ${port}`)
})

module.exports = server
