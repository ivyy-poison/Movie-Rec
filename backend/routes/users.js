const express = require("express")
const router = express.Router()
const { handleLogIn, verifyJWT, handleSignUp, getDashboard } = require("../controllers/handleUsers.js")
const { checkUserSignUp, checkUserSignIn } = require("../controllers/validateUser.js")


router.get("/dashboard", verifyJWT, getDashboard) // This one should eventually change to dashsboard
router.post("/signup", checkUserSignUp(), handleSignUp)
router.post("/signin", checkUserSignIn(), handleLogIn)


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

module.exports = router