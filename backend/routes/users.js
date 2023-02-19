const express = require("express")
const router = express.Router()
const { verifyJWT } = require("../middleware/verifyJWT.js")
const { handleLogin } = require("../controllers/auth.js")
const db = require('../db/index.js')
const bcrypt = require("bcrypt")
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

router.use(cookieParser())

router.get("/dashboard", verifyJWT, (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.user.userId], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})

// router.get('/:id', verifyJWT, (req, res, next) => {
//   db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, result) => {
//     if (err) {
//       return next(err)
//     }
//     res.send(result.rows[0])
//   })
// })


router.post("/signup", (req, res, next) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  query = "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *"
  db.query(query, [req.body.username, req.body.email, hashedPassword], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})

router.post("/signin", handleLogin)

// router.post("/refresh-token", (req, res) => {
//   const refreshToken = req.body.refreshToken
//   console.log("this happened")
//   console.log(refreshToken)
//   if (!refreshToken) return res.sendStatus(401)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
//     res.json({ accessToken: accessToken })
//   })
// })




// router
//   .route("/:id")
//   .get((req, res) => {
//     console.log(req.user)
//     res.send(`Get User With ID ${req.params.id}`)
//   })
//   .put((req, res) => {
//     res.send(`Update User With ID ${req.params.id}`)
//   })
//   .delete((req, res) => {
//     res.send(`Delete User With ID ${req.params.id}`)
//   })

module.exports = router