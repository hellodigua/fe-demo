const express = require('express')
const path = require('path')
const http = require('http')
const mockjs = require('express-mockjs')

const port = 8002
const app = express()
const server = http.createServer(app)

app.use(mockjs(path.join(__dirname, 'mocks')))

server.listen(port)

server.on('listening', ()=> {
  console.log('server is running on localhost:'+port)
})