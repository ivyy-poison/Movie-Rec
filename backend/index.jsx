const express = require('express')
const app = express()
const port = 8000
const userRouter = require("./routes/users.jsx")

const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})


client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected')
  }
})

app.use("/users", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   