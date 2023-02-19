const express = require('express')
const app = express()
const port = 8000
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./routes/users.js")

// Middleware used //
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
app.use(express.json())
// Middleware used //

app.use("/users", userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   