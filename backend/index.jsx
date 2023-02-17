const express = require('express')
const app = express()
const port = 8000

const userRouter = require("./routes/users.jsx")

app.use(express.json())

app.use("/users", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   