const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT.js")
const { handleLogin } = require("../controllers/auth.js")
const db = require('../db/index.jsx')
const bcrypt = require("bcrypt")

router.get("/", (req, res, next) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows)
  })
})

router.get('/:id', (req, res, next) => {
  db.query('SELECT * FROM users WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      return next(err)
    }
    res.send(result.rows[0])
  })
})


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