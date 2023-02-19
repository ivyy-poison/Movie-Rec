const express = require("express")
const router = express.Router()
const { handleLogIn, verifyJWT, handleSignUp, getDashboard } = require("../controllers/handleUsers.js")
const db = require('../models/index.js')
const cookieParser = require('cookie-parser')
router.use(cookieParser())

// This one can chain get, update, delete
router.get("/dashboard", verifyJWT, getDashboard)

// router.get("/profile/:id", viewProfile)
router.post("/signup", handleSignUp)
router.post("/signin", handleLogIn)




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